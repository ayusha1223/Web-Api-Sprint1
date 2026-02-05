"use client";

export default function OrderSuccessPage() {
  return (
    <div
      style={{
        padding: "80px 20px",
        textAlign: "center",
      }}
    >
      <h1 style={{ color: "green", fontSize: "32px" }}>
        ✅ Order Confirmed
      </h1>

      <p style={{ marginTop: "12px", fontSize: "18px" }}>
        Your order has been placed successfully.
      </p>

      <p style={{ marginTop: "6px", color: "#666" }}>
        Thank you for shopping with us!
      </p>
    </div>
  );
}
