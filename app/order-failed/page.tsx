"use client";

import Link from "next/link";

export default function OrderFailed() {
  return (
    <div style={{ padding: "60px", textAlign: "center" }}>
      <h1>❌ Payment Failed</h1>
      <p>Something went wrong. Please try again.</p>

      <Link href="/cart">
        <button style={{ marginTop: "20px" }}>
          Go Back to Cart
        </button>
      </Link>
    </div>
  );
}
