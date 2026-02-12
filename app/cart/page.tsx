"use client";

import "./cart.css";
import { useShop } from "../context/ShopContext";
import { useState } from "react";
import { createPortal } from "react-dom";

export default function CartPage() {
  const {
    cart,
    updateQty,
    removeFromCart,
    totalPrice,
    clearCart,
  } = useShop();

  const [checkoutStep, setCheckoutStep] =
    useState<
      "none" | "details" | "payment" | "esewaDetails" | "card" | "cod" | "success"
    >("none");

  /* ================= CREATE ORDER ================= */
  const createOrder = async (paymentMethod: string) => {
    try {
      const token = localStorage.getItem("token");
      const user = JSON.parse(localStorage.getItem("user") || "{}");

      if (!token || !user?.id) {
        alert("Please login first");
        return false;
      }

      const res = await fetch("http://localhost:5050/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          userId: user.id,
          items: cart,
          totalAmount: totalPrice + 119,
          paymentMethod,
          address: {
            name: "Test User",
            phone: "9800000000",
            address: "Kathmandu",
            city: "Kathmandu",
          },
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        console.error("Order error:", data);
        alert("Order failed");
        return false;
      }

      console.log("Order created:", data);

      clearCart(); // 🔥 clear only after success
      return true;

    } catch (error) {
      console.error("Order failed:", error);
      return false;
    }
  };

  return (
    <div className="cartPage">
      <h1 className="cartTitle">My Cart</h1>

      <div className="cartLayout">

        {/* LEFT SIDE */}
        <div className="cartItems">
          {cart.map((item) => (
            <div
              className="cartItem"
              key={`${item.img}-${item.size}`}
            >
              <img
                src={item.img}
                alt="Product"
                className="cartProductImg"
              />

              <div className="cartItemInfo">
                <h4>Kurtha Set</h4>
                <p>Size: {item.size}</p>

                <div className="priceRow">
                  <span className="price">₹{item.price}</span>
                </div>
              </div>

              <div className="qtyBox">
                <button
                  onClick={() =>
                    updateQty(item.img, item.size, item.qty - 1)
                  }
                >
                  -
                </button>

                <span>{item.qty}</span>

                <button
                  onClick={() =>
                    updateQty(item.img, item.size, item.qty + 1)
                  }
                >
                  +
                </button>
              </div>

              <button
                className="removeBtn"
                onClick={() =>
                  removeFromCart(item.img, item.size)
                }
              >
                ✕ Remove
              </button>
            </div>
          ))}
        </div>

        {/* RIGHT SIDE */}
        <div className="orderSummary">
          <div className="summaryBox">
            <h4>Your Order</h4>

            <div className="summaryRow">
              <span>Subtotal</span>
              <span>₹{totalPrice}</span>
            </div>

            <div className="summaryRow">
              <span>Delivery</span>
              <span>₹99</span>
            </div>

            <div className="summaryRow">
              <span>Service Fee</span>
              <span>₹20</span>
            </div>

            <hr />

            <div className="summaryRow total">
              <span>Total Payable</span>
              <span>₹{totalPrice + 119}</span>
            </div>

            <button
              className="checkoutBtn"
              onClick={() => setCheckoutStep("payment")}
            >
              PROCEED TO CHECKOUT
            </button>
          </div>
        </div>
      </div>

      {/* ================= PAYMENT MODAL ================= */}
      {checkoutStep !== "none" &&
        typeof window !== "undefined" &&
        createPortal(
          <div className="overlay">
            <div className="modalCard">

              {checkoutStep === "payment" && (
                <>
                  <h2>Select Payment Method</h2>

                  <button
                    className="primary"
                    onClick={async () => {
                      const success = await createOrder("Card");
                      if (success) setCheckoutStep("success");
                    }}
                  >
                    💳 Pay by Card
                  </button>

                  <button
                    className="primary"
                    onClick={async () => {
                      const success = await createOrder("COD");
                      if (success) setCheckoutStep("success");
                    }}
                  >
                    🚚 Cash on Delivery
                  </button>
                </>
              )}

              {checkoutStep === "success" && (
                <>
                  <h2>✅ Order Confirmed</h2>
                  <p>Your order has been placed successfully.</p>
                  <p>Total Paid: ₹{totalPrice + 119}</p>

                  <button
                    className="primary"
                    onClick={() => setCheckoutStep("none")}
                  >
                    Close
                  </button>
                </>
              )}

            </div>
          </div>,
          document.body
        )}
    </div>
  );
}
