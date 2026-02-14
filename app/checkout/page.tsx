"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useShop } from "../context/ShopContext";
import TopBar from "../components/TopBar";
import "./checkout.css";

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, totalPrice, clearCart } = useShop();
  const [showModal, setShowModal] = useState(false);
const [selectedPayment, setSelectedPayment] = useState(null);
  const [step, setStep] = useState(1);
  const total = totalPrice + 119;
  const [showOTP, setShowOTP] = useState(false);


  return (
    
    <div className="checkoutPage">
      <TopBar showTryOn={true} />
       <div className="checkoutStepper">
  <div className="stepItem">
    <div className={`circle ${step >= 1 ? "active" : ""}`}>1</div>
    <span>Delivery</span>
  </div>

  <div className={`line ${step >= 2 ? "active" : ""}`}></div>

  <div className="stepItem">
    <div className={`circle ${step >= 2 ? "active" : ""}`}>2</div>
    <span>Payment</span>
  </div>

  <div className={`line ${step >= 3 ? "active" : ""}`}></div>

  <div className="stepItem">
    <div className={`circle ${step >= 3 ? "active" : ""}`}>3</div>
    <span>Expected</span>
  </div>

  <div className={`line ${step >= 4 ? "active" : ""}`}></div>

  <div className="stepItem">
    <div className={`circle ${step >= 4 ? "active" : ""}`}>4</div>
    <span>Confirm</span>
  </div>
</div>
      <>
    </>
       {step === 1 && (
  <div className="deliveryLayout">

    {/* LEFT SIDE */}
    <div className="deliveryLeft">

      <h2>Delivery Details</h2>

      <div className="inputGroup">
        <label>Full Name</label>
        <input placeholder="Enter your full name" />
      </div>

      <div className="inputGroup">
        <label>Phone Number</label>
        <input placeholder="Enter phone number" />
      </div>

      <div className="inputGroup">
        <label>Address</label>
        <input placeholder="Street address" />
      </div>

      <div className="mapSection">
        <p>📍 Choose Your Location</p>
        <iframe
          title="map"
          src="https://www.google.com/maps?q=Kathmandu&output=embed"
          loading="lazy"
        ></iframe>
      </div>

      <div className="inputGroup">
        <label>City</label>
        <input placeholder="Enter your city" />
      </div>

      <button
        className="continueBtn"
        onClick={() => setStep(2)}
      >
        Continue to Payment
      </button>

    </div>

    {/* RIGHT SIDE */}
    <div className="deliveryRight">

      <div className="summaryCard">
        <h3>Order Summary</h3>

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
          <span>Total</span>
          <span>₹{totalPrice + 119}</span>
        </div>
      </div>

    </div>

  </div>
)}
       {/* STEP 2 – AMAZON STYLE PAYMENT */}
{step === 2 && (
  <>
    <div className="paymentLayout">

      <h2>Select Payment Method</h2>

      <div className="paymentGrid">

        {/* CARD */}
        <div
          className="paymentCard"
          onClick={() => {
            setSelectedPayment("card");
            setShowModal(true);
          }}
        >
          <div className="paymentLeft">
            💳
            <div>
              <h4>Credit / Debit Card</h4>
              <p>Visa, Mastercard, Rupay</p>
            </div>
          </div>
        </div>

        {/* COD */}
        <div
          className="paymentCard"
          onClick={() => {
            setSelectedPayment("cod");
            setStep(4);
          }}
        >
          <div className="paymentLeft">
            🚚
            <div>
              <h4>Cash on Delivery</h4>
              <p>Pay when your order arrives</p>
            </div>
          </div>
        </div>

        {/* ESEWA */}
        <div
          className="paymentCard"
          onClick={() => {
            setSelectedPayment("esewa");
            setShowModal(true);
          }}
        >
          <div className="paymentLeft">
            🟢
            <div>
              <h4>eSewa</h4>
              <p>Fast & secure Nepali payment</p>
            </div>
          </div>
        </div>

        {/* PAYPAL */}
        <div
          className="paymentCard paypal"
          onClick={() => {
            setSelectedPayment("paypal");
            setShowModal(true);
          }}
        >
          <div className="paymentLeft">
            🟦
            <div>
              <h4>PayPal</h4>
              <p>Secure international payment</p>
            </div>
          </div>
        </div>

      </div>

      <button className="backBtn" onClick={() => setStep(1)}>
        Back
      </button>
    </div>

    {/* MODAL */}
    {showModal && (
      <div className="paymentModalOverlay">
       {showOTP ? (

  /* ===== OTP SCREEN ===== */
  <div className="cardModal">
    <h3>OTP Verification</h3>
    <p>Enter the 6-digit OTP sent to your registered number</p>

    <input placeholder="Enter OTP" />

    <div className="modalActions">
      <button onClick={() => setShowOTP(false)}>
        Back
      </button>

      <button
        className="confirmBtn"
        onClick={() => {
          setShowOTP(false);
          setShowModal(false);
          setStep(3);
        }}
      >
        Verify & Continue
      </button>
    </div>
  </div>

)
}


        {/* ================= CARD MODAL ================= */}
        {selectedPayment === "card" && (
          <div className="cardModal">
            <div className="modalHeader">
              <img src="/icons/visa.png" alt="visa" />
              <img src="/icons/mastercard.png" alt="mastercard" />
              <img src="/icons/rupay.png" alt="rupay" />
            </div>

            <h3>Secure Card Payment</h3>

            <input placeholder="Card Number" />
            <div className="row">
              <input placeholder="MM/YY" />
              <input placeholder="CVV" />
            </div>

            <div className="modalActions">
              <button onClick={() => setShowModal(false)}>Cancel</button>
              <button
                className="confirmBtn"
                onClick={() => {
                  setShowModal(false);
                  setStep(3);
                }}
              >
                Continue
              </button>
            </div>
          </div>
        )}

        {/* ================= ESEWA MODAL ================= */}
        {selectedPayment === "esewa" && (
          <div className="esewaModal">

            <div className="esewaHeader">
              <img src="/icons/esewa.png" alt="eSewa" />
              <button
                className="closeBtn"
                onClick={() => setShowModal(false)}
              >
                ✕
              </button>
            </div>

            <h2>Welcome</h2>

            <div className="esewaTabs">
              <span className="activeTab">Mobile Number</span>
              <span>Email Address</span>
            </div>

            <div className="esewaInputGroup">
              <label>eSewa ID</label>
              <input placeholder="98XXXXXXXX" />
            </div>

            <div className="esewaInputGroup">
              <label>MPIN / Password</label>
              <input type="password" placeholder="Your 4-digit MPIN" />
            </div>

            <div className="rememberRow">
              <label>
                <input type="checkbox" />
                Remember me
              </label>

              <span className="forgot">Forgot MPIN?</span>
            </div>

            <button
  className="esewaLoginBtn"
  onClick={() => {
    setShowOTP(true); // show OTP screen
  }}
>
  LOGIN
</button>
            <div className="supportBox">
              24x7 Help & Support
            </div>

            <div className="registerText">
              Register
            </div>

          </div>
        )}

       {selectedPayment === "paypal" && (
  <div className="paypalModal">

    <div className="paypalHeader">
      <img src="/images/paypal.png" alt="paypal" className="paypalLogo" />
    </div>

    <h3>Login to PayPal</h3>

    <input
      type="email"
      placeholder="Email address"
      className="paypalInput"
    />

    <input
      type="password"
      placeholder="Password"
      className="paypalInput"
    />

    <div className="paypalActions">
      <button
        className="cancelBtn"
        onClick={() => setShowModal(false)}
      >
        Cancel
      </button>
<button
  className="confirmBtn"
  onClick={() => {
    setShowOTP(true); // show OTP
  }}
>
  Continue
</button>
    </div>
  </div>
)}
      </div>
    )}
  </>
  
)}


        {/* STEP 3 */}
        {step === 3 && (
          <div className="card">
            <h2>Expected Delivery</h2>
            <p>Your order will arrive in 3–5 business days.</p>

            <button onClick={() => setStep(4)}>Confirm</button>
            <button onClick={() => setStep(2)}>Back</button>
          </div>
        )}

        {/* STEP 4 */}
        {step === 4 && (
          <div className="card">
            <h2>Confirm Order</h2>
            <p>Total: ₹{total}</p>

            <button
              onClick={() => {
                clearCart();
                router.push("/order-success");
              }}
            >
              Place Order
            </button>

            <button onClick={() => setStep(3)}>Back</button>
          </div>
        )}
      </div>
  );
}
