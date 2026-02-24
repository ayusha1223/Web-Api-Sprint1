"use client";

import { useState } from "react";
import "./cart.css";
import { useShop } from "../context/ShopContext";
import TopBar from "../components/TopBar";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { FaUser, FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
type DeliveryErrors = {
  fullName?: string;
  phone?: string;
  email?: string;
  address?: string;
  city?: string;
};

export default function CartPage() {
  const { cart, updateQty, removeFromCart, totalPrice } = useShop();
  const router = useRouter();
  const total = (totalPrice || 0) + 119;
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);
const [cardName, setCardName] = useState("");
const [cardNumber, setCardNumber] = useState("");
const [expiryMonth, setExpiryMonth] = useState("");
const [expiryYear, setExpiryYear] = useState("");
const [cvv, setCvv] = useState("");
const [paypalEmail, setPaypalEmail] = useState("");
const [paypalError, setPaypalError] = useState("");
const [showCodConfirm, setShowCodConfirm] = useState(false);
const [showOtpModal, setShowOtpModal] = useState(false);
const [otp, setOtp] = useState("");
const [otpError, setOtpError] = useState("");
const [formErrors, setFormErrors] = useState<DeliveryErrors>({});
const [pendingMethod, setPendingMethod] = useState<string | null>(null);
const [showReviewModal, setShowReviewModal] = useState(false);
const [showOrderSuccess, setShowOrderSuccess] = useState(false);
  const handleUseLocation = () => {
  if (!navigator.geolocation) {
    alert("Geolocation not supported");
    return;
  }

  navigator.geolocation.getCurrentPosition(
    async (position) => {
      console.log("Latitude:", position.coords.latitude);
      console.log("Longitude:", position.coords.longitude);

      const { latitude, longitude } = position.coords;

      try {
        const res = await fetch(
  `http://localhost:5050/api/reverse?lat=${latitude}&lon=${longitude}`
);

        const data = await res.json();
        console.log("Address data:", data);

        if (data) {
          setAddress(data.display_name || "");

          const cityName =
            data.address?.city ||
            data.address?.town ||
            data.address?.village ||
            data.address?.state ||
            "";

          setCity(cityName);
        }
      } catch (err) {
        console.error(err);
        alert("Reverse geocoding failed");
      }
    },
    (error) => {
      console.error("Geolocation error:", error);
      alert("Error code: " + error.code);
    },
    {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 0,
    }
  );
};
  const [checkoutStep, setCheckoutStep] = useState<
    "none" | "details" | "payment"
  >("none");
  const [address, setAddress] = useState("");
const [city, setCity] = useState("");
const [selectedPayment, setSelectedPayment] = useState<string | null>(null);


  useEffect(() => {
  if (checkoutStep !== "none") {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "auto";
  }
}, [checkoutStep]);

const formatCardNumber = (value) => {
  return value
    .replace(/\D/g, "")
    .slice(0, 16)
    .replace(/(.{4})/g, "$1 ")
    .trim();
};
const validatePaypalEmail = () => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!paypalEmail) {
    setPaypalError("Email is required");
    return false;
  }

  if (!emailRegex.test(paypalEmail)) {
    setPaypalError("Enter a valid email address");
    return false;
  }

  setPaypalError("");
  return true;
};
const validateDeliveryForm = () => {
  const errors: {
  fullName?: string;
  phone?: string;
  email?: string;
  address?: string;
  city?: string;
} = {};

  if (!fullName.trim()) {
    errors.fullName = "Full name is required";
  }

  if (!phone.trim()) {
    errors.phone = "Phone number is required";
  } else if (!/^\d{10}$/.test(phone)) {
    errors.phone = "Enter valid 10 digit phone number";
  }

  if (!email.trim()) {
    errors.email = "Email is required";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = "Enter valid email address";
  }

  if (!address.trim()) {
    errors.address = "Address is required";
  } else if (address.length < 10) {
    errors.address = "Address is too short";
  }

  if (!city.trim()) {
    errors.city = "City is required";
  }

  setFormErrors(errors);

  return Object.keys(errors).length === 0;
};

  return (
    <div className="cartPage">
      <TopBar showTryOn={true} />
      <h1 className="cartTitle">My Cart</h1>

      <div className="cartLayout">

        {/* LEFT SIDE */}
        <div className="cartItems">
          {cart.map((item) => (
            <div
              className="cartItem"
              key={`${item.img}-${item.size}`}
            >
              <img src={item.img} alt="Product" />

              <div className="cartItemInfo">
                <h4>{item.name || "Kurtha Set"}</h4>
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
              <span>₹{total}</span>
            </div>

            <button
              className="checkoutBtn"
              onClick={() => {
                if (cart.length === 0) {
                  alert("Your cart is empty");
                  return;
                }
                setCheckoutStep("details");   // 🔥 Open modal instead of routing
              }}
            >
              PROCEED TO CHECKOUT
            </button>
          </div>
        </div>
      </div>

      {/* ================= CHECKOUT MODAL ================= */}

    {/* ================= DELIVERY DETAILS ================= */}
{checkoutStep === "details" && (
  <div
    className="checkoutOverlay"
    onClick={() => setCheckoutStep("none")}
  >
    <div
      className="checkoutModal"
      onClick={(e) => e.stopPropagation()}
    >
      <h2>Delivery Details</h2>

      <div className="inputGroup">
        <FaUser className="inputIcon userIcon" />
        <input
          type="text"
          placeholder="Full Name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />
        {formErrors.fullName && (
  <p className="formError">{formErrors.fullName}</p>
)}
      </div>

      <div className="inputGroup">
        <FaPhone className="inputIcon phoneIcon" />
        <input
          type="tel"
          placeholder="Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        {formErrors.phone && (
  <p className="formError">{formErrors.phone}</p>
)}
      </div>

      <div className="inputGroup">
        <FaEnvelope className="inputIcon emailIcon" />
        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {formErrors.email && (
  <p className="formError">{formErrors.email}</p>
)}
      </div>

      <div className="inputGroup">
        <FaMapMarkerAlt className="inputIcon locationIcon" />
        <textarea
          placeholder="Full Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        {formErrors.address && (
  <p className="formError">{formErrors.address}</p>
)}
      </div>

      <input
        placeholder="City"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      {formErrors.city && (
  <p className="formError">{formErrors.city}</p>
)}

      <button className="locationBtn" onClick={handleUseLocation}>
        📍 Use My Current Location
      </button>

      <div className="modalActions">
        <button onClick={() => setCheckoutStep("none")}>
          Cancel
        </button>

      <button
  className="primary"
  onClick={() => {
    if (validateDeliveryForm()) {
      setCheckoutStep("payment");
    }
  }}
>
  Continue
</button>
      </div>
    </div>
  </div>
)}

      {/* ================= PAYMENT SELECTION ================= */}
{checkoutStep === "payment" && !selectedPayment && (
  <div
    className="checkoutOverlay"
    onClick={() => setCheckoutStep("details")}
  >
    <div
      className="checkoutModal"
      onClick={(e) => e.stopPropagation()}
    >
      <h2>Select Payment Method</h2>

      <button className="payOption" onClick={() => setSelectedPayment("card")}>
        💳 Card
      </button>

      <button className="payOption" onClick={() => setSelectedPayment("esewa")}>
        🟢 eSewa
      </button>

      <button className="payOption" onClick={() => setSelectedPayment("paypal")}>
        🟦 PayPal
      </button>

      <button
  className="payOption"
  onClick={() => setShowCodConfirm(true)}
>
  🚚 Cash on Delivery
</button>

      <div className="modalActions">
        <button onClick={() => setCheckoutStep("details")}>
          Back
        </button>
      </div>
    </div>
  </div>
)}

 {/* ================= CARD MODAL ================= */}
{selectedPayment === "card" && (
  <div className="checkoutOverlay">
    <div
      className="checkoutModal"
      onClick={(e) => e.stopPropagation()}
    >
      <button
  className="modalClose"
  onClick={() => setSelectedPayment(null)}
>
  ✕
</button>
      <h2>Card Payment</h2>

      <div className="cardPaymentContainer">
        <div className="creditCardPreview">
          <div className="cardChip"></div>

          <div className="cardNumber">
            {cardNumber || "1234 5678 9012 3456"}
          </div>

          <div className="cardBottom">
            <div>
              <small>CARDHOLDER NAME</small>
              <div>{cardName || "YOUR NAME"}</div>
            </div>

            <div>
              <small>EXPIRY</small>
              <div>
                {expiryMonth || "MM"}/{expiryYear || "YY"}
              </div>
            </div>
          </div>
        </div>

        <div className="cardForm">
          <input
            placeholder="Card Number"
            value={cardNumber}
            onChange={(e) =>
              setCardNumber(formatCardNumber(e.target.value))
            }
          />

          <input
            placeholder="Cardholder Name"
            value={cardName}
            onChange={(e) => setCardName(e.target.value)}
          />

          <div className="row">
            <input
              placeholder="MM"
              value={expiryMonth}
              onChange={(e) =>
                setExpiryMonth(e.target.value.replace(/\D/g, "").slice(0, 2))
              }
            />

            <input
              placeholder="YY"
              value={expiryYear}
              onChange={(e) =>
                setExpiryYear(e.target.value.replace(/\D/g, "").slice(0, 2))
              }
            />

            <input
              placeholder="CVV"
              value={cvv}
              onChange={(e) =>
                setCvv(e.target.value.replace(/\D/g, "").slice(0, 3))
              }
            />
          </div>

          <button
  className="payNowBtn"
  onClick={() => {
    setSelectedPayment(null);
    setShowReviewModal(true);
    router.push(
  `/payment?method=card&name=${encodeURIComponent(fullName)}&phone=${encodeURIComponent(phone)}&city=${encodeURIComponent(city)}&address=${encodeURIComponent(address)}`
);

    setTimeout(() => {
    }, 2500);
  }}
>
  Pay Now
</button>
        </div>
      </div>
    </div>
  </div>
)}

{/* ================= ESEWA MODAL ================= */}
{selectedPayment === "esewa" && (
  <div className="checkoutOverlay">
    <div
      className="esewaStandaloneModal"
      onClick={(e) => e.stopPropagation()}
    >
      <button
        className="esewaClose"
        onClick={() => setSelectedPayment(null)}
      >
        ✕
      </button>

      <div className="esewaContainer">
        <div className="esewaLeftPanel">
          <h2>eSewa</h2>
          <p>Login securely to complete your payment.</p>
        </div>

        <div className="esewaRightPanel">
          <h3>Login</h3>
          <input className="esewaInput" placeholder="eSewa ID" />
          <input
            type="password"
            className="esewaInput"
            placeholder="MPIN"
          />

         <button
  className="esewaLoginBtn"
  onClick={() => {
    setPendingMethod("esewa");
    setSelectedPayment(null);
    setShowOtpModal(true);
  }}
>
  Login
</button>
        </div>
      </div>
    </div>
  </div>
)}

{/* ================= PAYPAL MODAL ================= */}
{selectedPayment === "paypal" && (
  <div className="checkoutOverlay">
    <div
      className="paypalModal"
      onClick={(e) => e.stopPropagation()}
    >
      <button
        className="modalClose"
        onClick={() => {
          setSelectedPayment(null);
          setPaypalEmail("");
          setPaypalError("");
        }}
      >
        ✕
      </button>

      <h1 className="paypalTitle">PayPal</h1>

      <input
        type="email"
        className="paypalInput"
        placeholder="Email address"
        value={paypalEmail}
        onChange={(e) => {
          setPaypalEmail(e.target.value);
          setPaypalError("");
        }}
      />

      {paypalError && (
        <p style={{ color: "red", fontSize: "14px", marginBottom: "15px" }}>
          {paypalError}
        </p>
      )}

      <button
        className="paypalNextBtn"
       onClick={() => {
  if (validatePaypalEmail()) {
    setPendingMethod("paypal");
    setSelectedPayment(null);
    setShowOtpModal(true);
  }
}}
      >
        Next
      </button>
    </div>
  </div>
)}
{/* ================= COD CONFIRM MODAL ================= */}
{showCodConfirm && (
  <div className="checkoutOverlay">
    <div
      className="codConfirmModal"
      onClick={(e) => e.stopPropagation()}
    >
      <button
        className="modalClose"
        onClick={() => setShowCodConfirm(false)}
      >
        ✕
      </button>

      <h2>Confirm Order</h2>
      <p style={{ marginBottom: "30px", color: "#555" }}>
        Do you want to confirm your order with Cash on Delivery?
      </p>

      <div className="modalActions">
        <button
          onClick={() => setShowCodConfirm(false)}
        >
          Cancel
        </button>

        <button
          className="primary"
          onClick={() => {
            setShowCodConfirm(false);
            router.push(
              `/payment?method=cod&name=${encodeURIComponent(fullName)}&phone=${encodeURIComponent(phone)}&city=${encodeURIComponent(city)}&address=${encodeURIComponent(address)}`
            );
          }}
        >
          Confirm Order
        </button>
      </div>
    </div>
  </div>
)}
{/* ================= OTP MODAL ================= */}
{showOtpModal && (
  <div className="checkoutOverlay">
    <div className="otpModal" onClick={(e) => e.stopPropagation()}>
      <h2>Enter OTP</h2>
      <p style={{ marginBottom: "20px", color: "#666" }}>
        Please enter 6 digit verification code
      </p>

      <input
        type="text"
        maxLength={6}
        value={otp}
        onChange={(e) => {
          setOtp(e.target.value.replace(/\D/g, "").slice(0, 6));
          setOtpError("");
        }}
        className="otpInput"
      />

      {otpError && (
        <p style={{ color: "red", marginTop: "10px" }}>
          {otpError}
        </p>
      )}

      <div className="modalActions" style={{ marginTop: "30px" }}>
        <button onClick={() => setShowOtpModal(false)}>
          Cancel
        </button>

       <button
  className="primary"
  onClick={() => {
    if (otp.length !== 6) {
      setOtpError("Enter valid 6 digit OTP");
      return;
    }

    setShowOtpModal(false);

    if (pendingMethod) {
      router.push(
        `/payment?method=${pendingMethod}&name=${encodeURIComponent(fullName)}&phone=${encodeURIComponent(phone)}&city=${encodeURIComponent(city)}&address=${encodeURIComponent(address)}`
      );
    }
  }}
>
  Verify
</button>
      </div>
    </div>
  </div>
)}
{/* ================= REVIEWING MODAL ================= */}
{showReviewModal && (
  <div className="checkoutOverlay">
    <div className="reviewModal">
      <h2>Reviewing Payment</h2>
      <p style={{ marginTop: "20px", color: "#666" }}>
        Please wait while we verify your card details...
      </p>
      <div className="loader"></div>
    </div>
  </div>
)}
  </div>
)}
