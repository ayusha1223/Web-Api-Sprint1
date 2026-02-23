"use client";

import { useShop } from "../context/ShopContext";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function PaymentPage() {
  const { cart, totalPrice, clearCart } = useShop();
  const [method, setMethod] = useState<"esewa" | "card" | "cod">("esewa");
  const router = useRouter();

  const finalAmount = totalPrice + 119;

  const handleCreateOrder = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login first");
      return;
    }

    const orderData = {
      items: cart.map((item) => ({
  img: item.img,
  qty: item.qty,
  price: item.price,
  size: item.size,
})),
      totalAmount: finalAmount,
      paymentMethod:
        method === "cod"
          ? "COD"
          : method === "card"
          ? "Card"
          : "eSewa",
      address: {
        name: "Test User", // replace with real form data later
        phone: "9800000000",
        address: "Kathmandu",
        city: "Kathmandu",
      },
    };

    const response = await fetch("http://localhost:5050/api/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(orderData),
    });

    const data = await response.json();
    console.log("ORDER RESPONSE:", data);

    if (!data.success) {
      alert("Order failed");
      return null;
    }

    return data;
  };

  const handleEsewaPayment = (orderId: string) => {
    const form = document.createElement("form");
    form.method = "POST";
    form.action = "https://uat.esewa.com.np/epay/main";

    const fields: Record<string, string> = {
      amt: finalAmount.toString(),
      psc: "0",
      pdc: "0",
      txAmt: "0",
      tAmt: finalAmount.toString(),
      pid: orderId,
      scd: "EPAYTEST",
      su: "http://localhost:3000/payment-success",
      fu: "http://localhost:3000/payment-failure",
    };

    for (const key in fields) {
      const input = document.createElement("input");
      input.type = "hidden";
      input.name = key;
      input.value = fields[key];
      form.appendChild(input);
    }

    document.body.appendChild(form);
    form.submit();
  };

  const handlePay = async () => {
    const response = await handleCreateOrder();
if (!response) return;

const order = response.data; // 🔥 important
    if (!order) return;

    if (method === "esewa") {
      handleEsewaPayment(order._id);
    } else if (method === "cod") {
      router.push("/order-success");
    } else {
      alert("Card payment coming soon");
    }
  };

  return (
    <div style={{ padding: 50, maxWidth: 500 }}>
      <h1>Payment</h1>

      <label>
        <input
          type="radio"
          checked={method === "esewa"}
          onChange={() => setMethod("esewa")}
        />
        Esewa
      </label>

      <br />

      <label>
        <input
          type="radio"
          checked={method === "card"}
          onChange={() => setMethod("card")}
        />
        Card
      </label>

      <br />

      <label>
        <input
          type="radio"
          checked={method === "cod"}
          onChange={() => setMethod("cod")}
        />
        Cash on Delivery
      </label>

      <button
        onClick={handlePay}
        style={{
          marginTop: 20,
          width: "100%",
          padding: 14,
          background: "black",
          color: "white",
        }}
      >
        PAY ₹{finalAmount}
      </button>
    </div>
  );
}