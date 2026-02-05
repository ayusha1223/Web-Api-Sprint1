"use client";

import { useShop } from "../context/ShopContext";
import { useState } from "react";

export default function PaymentPage() {
  const { totalPrice } = useShop();
  const [method, setMethod] = useState<"esewa" | "card" | "cod">("esewa");

  const finalAmount = totalPrice + 119; // delivery + service

  const handlePay = () => {
    if (method === "esewa") {
      // handled below
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
