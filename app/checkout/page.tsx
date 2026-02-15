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
  const [orderPlaced, setOrderPlaced] = useState(false);
const [placingOrder, setPlacingOrder] = useState(false);
const [fullName, setFullName] = useState("");
const [phone, setPhone] = useState("");
const [address, setAddress] = useState("");
const [city, setCity] = useState("");
const [otp, setOtp] = useState("");
const [cardNumber, setCardNumber] = useState("");
const [expiry, setExpiry] = useState("");
const [cvv, setCvv] = useState("");
const [esewaId, setEsewaId] = useState("");
const [mpin, setMpin] = useState("");
const [paypalEmail, setPaypalEmail] = useState("");
const [paypalPassword, setPaypalPassword] = useState("");


const [errors, setErrors] = useState<any>({});

const handlePlaceOrder = async () => {
  if (cart.length === 0) {
  alert("Your cart is empty");
  return;
}
  try {
    setPlacingOrder(true);

    const token = localStorage.getItem("token");

    if (!token) {
  alert("Please login first");
  setPlacingOrder(false);
  return;
}
    const res = await fetch("http://localhost:5050/api/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        items: cart,
        totalAmount: total,
        paymentMethod:
          selectedPayment === "cod"
            ? "COD"
            : selectedPayment === "card"
            ? "Card"
            : selectedPayment === "esewa"
            ? "eSewa"
            : "Card",
      address: {
  name: fullName,
  phone,
  address,
  city,
},
      }),
    });

    const data = await res.json();

    console.log("ORDER RESPONSE:", data);

    if (!res.ok || !data.success) {
      alert("Order failed");
      setPlacingOrder(false);
      return;
    }

    clearCart();
    setOrderPlaced(true);
    setPlacingOrder(false);

  } catch (error) {
    console.error("Order error:", error);
    setPlacingOrder(false);
  }
};

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
        <input
  value={fullName}
  onChange={(e) => setFullName(e.target.value)}
  placeholder="Enter your full name"
/>
{errors.fullName && <p className="error">{errors.fullName}</p>}

      </div>

      <div className="inputGroup">
        <label>Phone Number</label>
        <input
  value={phone}
  onChange={(e) => setPhone(e.target.value)}
  placeholder="Enter phone number"
/>
{errors.phone && <p className="error">{errors.phone}</p>}

      </div>

      <div className="inputGroup">
        <label>Address</label>
        <input
  value={address}
  onChange={(e) => setAddress(e.target.value)}
  placeholder="Street address"
/>
{errors.address && <p className="error">{errors.address}</p>}

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
       <input
  value={city}
  onChange={(e) => setCity(e.target.value)}
  placeholder="Enter your city"
/>
{errors.city && <p className="error">{errors.city}</p>}

      </div>

      <button
        className="continueBtn"
        onClick={() => {
  const newErrors: any = {};

  if (!fullName) newErrors.fullName = "Full name is required";
  if (!phone) newErrors.phone = "Phone is required";
  if (phone && phone.length < 8)
    newErrors.phone = "Enter valid phone number";
  if (!address) newErrors.address = "Address is required";
  if (!city) newErrors.city = "City is required";

  if (Object.keys(newErrors).length > 0) {
    setErrors(newErrors);
    return;
  }

  setErrors({});
  setStep(2);
}}
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
  setStep(3);
}}        >
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
    <input
  value={otp}
  onChange={(e) => setOtp(e.target.value)}
  placeholder="Enter OTP"
/>
{errors.otp && <p className="error">{errors.otp}</p>}
    <div className="modalActions">
      <button onClick={() => setShowOTP(false)}>
        Back
      </button>

      <button
        className="confirmBtn"
        onClick={() => {
  if (!otp || otp.length !== 6) {
    setErrors({ otp: "Enter valid 6 digit OTP" });
    return;
  }

  setErrors({});
  setShowOTP(false);
  setShowModal(false);
  setStep(3);
}}
      >
        Verify & Continue
      </button>
    </div>
  </div>
       ) : (
  <>
        {/* ================= CARD MODAL ================= */}
        {selectedPayment === "card" && (
          <div className="cardModal">
            <div className="modalHeader">
              <img src="/icons/visa.png" alt="visa" />
              <img src="/icons/mastercard.png" alt="mastercard" />
              <img src="/icons/rupay.png" alt="rupay" />
            </div>
            <h3>Secure Card Payment</h3>
            <div className="row">
              <input
  value={cardNumber}
  onChange={(e) => setCardNumber(e.target.value)}
  placeholder="Card Number"
/>

<div className="row">
  <input
    value={expiry}
    onChange={(e) => setExpiry(e.target.value)}
    placeholder="MM/YY"
  />
  <input
    value={cvv}
    onChange={(e) => setCvv(e.target.value)}
    placeholder="CVV"
  />
</div>
            </div>

            <div className="modalActions">
              <button onClick={() => setShowModal(false)}>Cancel</button>
              <button
                className="confirmBtn"
               onClick={() => {
  const newErrors: any = {};

  if (!cardNumber || cardNumber.length < 12)
    newErrors.cardNumber = "Enter valid card number";

  if (!expiry)
    newErrors.expiry = "Enter expiry date";

  if (!cvv || cvv.length < 3)
    newErrors.cvv = "Enter valid CVV";

  if (Object.keys(newErrors).length > 0) {
    setErrors(newErrors);
    return;
  }

  setErrors({});
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
              <input
  value={esewaId}
  onChange={(e) => setEsewaId(e.target.value)}
  placeholder="98XXXXXXXX"
/>
            </div>

            <div className="esewaInputGroup">
              <label>MPIN / Password</label>
              <input
  type="password"
  value={mpin}
  onChange={(e) => setMpin(e.target.value)}
  placeholder="Your 4-digit MPIN"
/>
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
  const newErrors: any = {};

  if (!esewaId || esewaId.length < 8)
    newErrors.esewaId = "Enter valid eSewa ID";

  if (!mpin || mpin.length < 4)
    newErrors.mpin = "Enter valid MPIN";

  if (Object.keys(newErrors).length > 0) {
    setErrors(newErrors);
    return;
  }

  setErrors({});
  setShowOTP(true);
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
  value={paypalEmail}
  onChange={(e) => setPaypalEmail(e.target.value)}
  type="email"
  placeholder="Email address"
/>
<input
  value={paypalPassword}
  onChange={(e) => setPaypalPassword(e.target.value)}
  type="password"
  placeholder="Password"
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
  const newErrors: any = {};

  if (!paypalEmail.includes("@"))
    newErrors.paypalEmail = "Enter valid email";

  if (!paypalPassword)
    newErrors.paypalPassword = "Password required";

  if (Object.keys(newErrors).length > 0) {
    setErrors(newErrors);
    return;
  }

  setErrors({});
  setShowOTP(true);
}}
>
  Continue
</button>
    </div>
          </div>
        )}
  </>
      )}
      </div>
    )}
  </>
  
)}

{step === 3 && (
  <div className="expectedLayout">

    {/* LEFT SIDE */}
    <div className="expectedLeft">

      <div className="deliveryCardModern">
        <h2>Expected Delivery</h2>

        <div className="deliveryStatus">
          🚚 In Transit
        </div>

        <div className="deliveryTime">
          Will be delivered in 
          <span> 3–5 business days</span>
        </div>

        <div className="deliveryMeta">
          <p><strong>Order ID:</strong> KB2026-2345</p>
          <p><strong>Payment:</strong> {selectedPayment}</p>
        </div>

        <div className="deliveryActions">
          <button
            className="confirmBtn"
            onClick={() => setStep(4)}
          >
            Confirm
          </button>

          <button
            className="backBtn"
            onClick={() => setStep(2)}
          >
            Back
          </button>
        </div>
      </div>

    </div>

    {/* RIGHT SIDE MAP */}
    <div className="expectedRight">
      <iframe
        title="delivery-map"
        src="https://www.google.com/maps?q=Kathmandu&output=embed"
        loading="lazy"
      />
    </div>

  </div>
)}
{step === 4 && !orderPlaced && (
  <div className="confirmWrapper">
    <div className="confirmCard">

      <h2>Confirm Your Order</h2>

      <p>Total Amount: <strong>₹{total}</strong></p>
      <p>Payment Method: <strong>{selectedPayment}</strong></p>

      <div style={{ marginTop: 20 }}>
        <button
          className="confirmBtn"
          onClick={handlePlaceOrder}
          disabled={placingOrder}
        >
          {placingOrder ? "Placing Order..." : "Place Order"}
        </button>

        <button
          className="backBtn"
          onClick={() => setStep(3)}
        >
          Back
        </button>
      </div>

    </div>
  </div>
)}
{orderPlaced && (
  <div className="orderSuccessWrapper">
    <div className="orderSuccessCard">

      <div className="successIcon">✓</div>

      <h2>Order Confirmed!</h2>

      <p>Your order has been placed successfully.</p>

      <p>
        Get delivery in <strong>3–5 business days</strong>
      </p>

      <div className="successButtons">

        <button
          className="trackBtn"
          onClick={() => router.push("/track-order")}
        >
          Track My Order
        </button>

        <button
          className="continueBtnSuccess"
          onClick={() => router.push("/dashboard")}
        >
          Continue Shopping
        </button>

      </div>
    </div>
  </div>
)}
    </div>
  );
}
