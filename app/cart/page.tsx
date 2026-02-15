"use client";

import "./cart.css";
import { useShop } from "../context/ShopContext";
import { useState } from "react";
import { createPortal } from "react-dom";
import TopBar from "../components/TopBar";
import { useRouter } from "next/navigation";

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
    const router = useRouter();


  // 🔥 CREATE ORDER FUNCTION
  const createOrder = async (paymentMethod: string, paymentStatus: string) => {
    await fetch("http://localhost:5050/api/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        items: cart,
        totalAmount: totalPrice + 119,
        paymentMethod,
        paymentStatus,
        address: {
          name: "Test User",
          phone: "9800000000",
          address: "Kathmandu",
          city: "Kathmandu",
        },
      }),
    });

    // 🔥 CLEAR CART SAFELY
    clearCart();
  };

 return (
  <div className="cartPage">

    <TopBar showTryOn={true} />

    <h1 className="cartTitle">My Cart</h1>


      <div className="cartLayout">
        {/* LEFT */}
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
        <p>Color: Mixed | Size: {item.size}</p>

        <div className="priceRow">
          <span className="oldPrice">₹2,999</span>
          <span className="price">₹{item.price}</span>
          <span className="off">20% OFF</span>
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

        {/* RIGHT */}
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
                onClick={() => {
    if (cart.length === 0) {
      alert("Your cart is empty");
      return;
    }

    router.push("/checkout");
  }}
>
  PROCEED TO CHECKOUT
            </button>
          </div>
        </div>
      </div>

      {/* ===== MODALS ===== */}
      {checkoutStep !== "none" &&
        typeof window !== "undefined" &&
        createPortal(
          <div className="overlay">
            <div className="modalCard">

              {/* DELIVERY DETAILS */}
              {checkoutStep === "details" && (
                <>
                  <h2>Delivery Details</h2>
                  <input placeholder="Full Name" />
                  <input placeholder="Phone Number" />
                  <input placeholder="Address" />
                  <input placeholder="Email" />

                  <div className="modalActions">
                    <button onClick={() => setCheckoutStep("none")}>Cancel</button>
                    <button
                      className="primary"
                      onClick={() => setCheckoutStep("payment")}
                    >
                      Continue
                    </button>
                  </div>
                </>
              )}

             {/* PAYMENT METHOD */}
{checkoutStep === "payment" && (
  <>
    <h2>Payment Method</h2>

    <div className="paymentOptions">
      <button
        className="payOption"
        onClick={() => setCheckoutStep("card")}
      >
        <span className="payIcon">💳</span>
        <span className="payText">Card</span>
      </button>

      <button
        className="payOption"
        onClick={() => setCheckoutStep("cod")}
      >
        <span className="payIcon">🚚</span>
        <span className="payText">Cash on Delivery</span>
      </button>

      <button
        className="payOption"
        onClick={() => setCheckoutStep("esewaDetails")}
      >
        <span className="payIcon">🟢</span>
        <span className="payText">eSewa</span>
      </button>
    </div>
  </>
)}

              {/* ESEWA DETAILS */}
{checkoutStep === "esewaDetails" && (
  <>
    {/* Header */}
    <div className="esewaHeader">
      <img
        src="/esewa.png"   // put logo in public/esewa.png
        alt="eSewa"
        className="esewaLogo"
      />
      <h2>eSewa Details</h2>
      <p className="esewaSub">Secure payment powered by eSewa</p>
    </div>

    {/* Inputs */}
    <input
      className="esewaInput"
      placeholder="eSewa ID / Mobile Number"
    />

    <input
      className="esewaInput"
      placeholder="MPIN"
      type="password"
    />

    {/* Actions */}
    <div className="modalActions">
      <button onClick={() => setCheckoutStep("payment")}>
        Back
      </button>

      <button
        className="primary esewaPayBtn"
        onClick={async () => {
          await createOrder("eSewa", "Paid");

          const res = await fetch(
            "http://localhost:5050/api/payment/esewa",
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ amount: totalPrice }),
            }
          );

          const html = await res.text();
          document.open();
          document.write(html);
          document.close();
        }}
      >
        Confirm & Pay
      </button>
    </div>
  </>
)}

              {/* CARD */}
              {checkoutStep === "card" && (
                <>
                  <h2>Card Details</h2>
                  <input placeholder="Card Number" />
                  <input placeholder="Expiry Date" />
                  <input placeholder="CVV" />

                  <button
                    className="primary"
                    onClick={async () => {
                      await createOrder("Card", "Paid");
                      setCheckoutStep("success");
                    }}
                  >
                    Confirm Payment
                  </button>
                </>
              )}

              {/* COD */}
              {checkoutStep === "cod" && (
                <>
                  <h2>Cash on Delivery</h2>
                  <p>Pay when your order is delivered.</p>

                  <button
                    className="primary"
                    onClick={async () => {
                      await createOrder("COD", "Pending");
                      setCheckoutStep("success");
                    }}
                  >
                    Confirm Order
                  </button>
                </>
              )}

              {/* SUCCESS */}
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