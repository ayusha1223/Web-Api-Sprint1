"use client";

import { useShop } from "../context/ShopContext";
import { useState } from "react";

export default function PaymentPage() {
  const { totalPrice } = useShop();
  const [method, setMethod] = useState<"esewa" | "card" | "cod">("esewa");

  const finalAmount = totalPrice + 119;

  const handleEsewaPayment = () => {
    const orderId = "ORDER_" + Date.now(); // temporary order id

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

  const handlePay = () => {
    if (method === "esewa") {
      handleEsewaPayment();
    } else if (method === "cod") {
      alert("Order placed with Cash on Delivery");
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
