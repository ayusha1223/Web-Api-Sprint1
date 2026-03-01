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
const [showCodConfirm, setShowCodConfirm] = useState(false);
const [createdOrderId, setCreatedOrderId] = useState<string | null>(null);
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
    <div className="bg-[#f5f5f6] min-h-screen">
  <TopBar />

  <div className="max-w-[1300px] mx-auto px-6 py-10">

    {/* TITLE */}
    <h1 className="text-3xl font-bold mb-8">
      My Cart ({cart.length})
    </h1>

    <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-10">

      {/* ================= LEFT: CART ITEMS ================= */}
      <div className="space-y-6">

        {cart.length === 0 ? (
          <div className="bg-white p-16 rounded-xl shadow-sm text-center">
            <p className="text-gray-500 text-lg">
              Your cart is empty 🛒
            </p>
          </div>
        ) : (
          cart.map((item) => (
            <div
              key={`${item.img}-${item.size}`}
              className="bg-white rounded-xl shadow-sm p-6 flex gap-6 hover:shadow-md transition"
            >

              {/* IMAGE */}
              <img
                src={item.img}
                alt="Product"
                className="w-32 h-40 object-contain cursor-pointer"
              />

              {/* INFO */}
              <div className="flex-1">

                <h3 className="font-semibold text-lg text-gray-800">
                  {item.name || "Kurtha Set"}
                </h3>

                <p className="text-gray-500 text-sm mt-1">
                  Size: {item.size}
                </p>

                <p className="font-bold text-lg mt-3">
                  ₹{item.price}
                </p>

                {/* QTY + REMOVE */}
                <div className="flex items-center gap-6 mt-4">

                  {/* QTY BOX */}
                  <div className="flex items-center border rounded-md overflow-hidden">

                    <button
                      onClick={() =>
                        updateQty(item.img, item.size, item.qty - 1)
                      }
                      className="px-3 py-1 bg-gray-100 hover:bg-gray-200 transition"
                    >
                      -
                    </button>

                    <span className="px-4 py-1 font-medium">
                      {item.qty}
                    </span>

                    <button
                      onClick={() =>
                        updateQty(item.img, item.size, item.qty + 1)
                      }
                      className="px-3 py-1 bg-gray-100 hover:bg-gray-200 transition"
                    >
                      +
                    </button>
                  </div>

                  {/* REMOVE */}
                  <button
                    onClick={() =>
                      removeFromCart(item.img, item.size)
                    }
                    className="text-sm text-red-500 hover:underline"
                  >
                    Remove
                  </button>

                </div>

              </div>
            </div>
          ))
        )}

      </div>

      {/* ================= RIGHT: ORDER SUMMARY ================= */}
      <div className="bg-white rounded-xl shadow-sm p-6 h-fit sticky top-24">

        <h3 className="text-lg font-semibold mb-6">
          Order Summary
        </h3>

        <div className="space-y-4 text-sm text-gray-700">

          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>₹{totalPrice}</span>
          </div>

          <div className="flex justify-between">
            <span>Delivery</span>
            <span>₹99</span>
          </div>

          <div className="flex justify-between">
            <span>Service Fee</span>
            <span>₹20</span>
          </div>

          <hr />

          <div className="flex justify-between font-bold text-lg">
            <span>Total Payable</span>
            <span>₹{total}</span>
          </div>

        </div>

        {/* CHECKOUT BUTTON */}
        <button
        data-testid="checkout-btn"
          onClick={() => {
            if (cart.length === 0) {
              alert("Your cart is empty");
              return;
            }
            setCheckoutStep("details");
          }}
          className="mt-8 w-full bg-[#ff3f6c] text-white py-3 rounded-lg font-semibold hover:bg-[#ff527b] transition shadow-md"
        >
          PROCEED TO CHECKOUT
        </button>

      </div>

    </div>

  
  

      {/* ================= CHECKOUT MODAL ================= */}

 {checkoutStep === "details" && (
  <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-50">

    <div className="bg-white w-[460px] max-w-[94%] rounded-3xl shadow-2xl relative overflow-hidden">

      {/* TOP GRADIENT STRIP */}
      <div className="h-2 bg-gradient-to-r from-pink-500 via-rose-400 to-pink-500"></div>

      <div className="p-7">

        {/* STEP INDICATOR */}
<div className="flex items-center justify-center mb-6">

  {/* Step 1 */}
  <div className="flex items-center">
    <div className="w-8 h-8 flex items-center justify-center rounded-full 
      bg-pink-500 text-white text-sm font-semibold">
      1
    </div>
    <span className="ml-2 text-sm font-medium text-pink-600">
      Delivery Details
    </span>
  </div>

  {/* Line */}
  <div className="w-12 h-[2px] bg-gray-300 mx-4"></div>

  {/* Step 2 */}
  <div className="flex items-center">
    <div className="w-8 h-8 flex items-center justify-center rounded-full 
      bg-gray-300 text-gray-600 text-sm font-semibold">
      2
    </div>
    <span className="ml-2 text-sm font-medium text-gray-500">
      Payment Method
    </span>
  </div>

</div>

        {/* HEADER */}
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Delivery Details
        </h2>

        <div className="space-y-4">

      <div className="relative">
  <span className={`absolute left-3 top-3 ${formErrors.fullName ? "text-red-500" : "text-gray-400"}`}>
    👤
  </span>

  

  <input
    className={`w-full pl-10 pr-3 py-2 border rounded-xl text-sm focus:ring-2 outline-none transition
      <input data-testid="delivery-fullname" ... />
      ${formErrors.fullName 
        ? "border-red-500 focus:ring-red-400" 
        : "border-gray-300 focus:ring-pink-400"}
    `}
    placeholder="Full Name"
    value={fullName}
    onChange={(e) => setFullName(e.target.value)}
  />

  {formErrors.fullName && (
    <p className="text-red-500 text-xs mt-1 ml-1">
      {formErrors.fullName}
    </p>
  )}
</div>
<div className="relative">
  <span className={`absolute left-3 top-3 ${formErrors.phone ? "text-red-500" : "text-gray-400"}`}>
    📞
  </span>

  <input
    className={`w-full pl-10 pr-3 py-2 border rounded-xl text-sm focus:ring-2 outline-none transition
      <input data-testid="delivery-phone" ... />
      ${formErrors.phone 
        ? "border-red-500 focus:ring-red-400" 
        : "border-gray-300 focus:ring-pink-400"}
    `}
    placeholder="Phone Number"
    value={phone}
    onChange={(e) => setPhone(e.target.value)}
  />

  {formErrors.phone && (
    <p className="text-red-500 text-xs mt-1 ml-1">
      {formErrors.phone}
    </p>
  )}
</div>
<div className="relative">
  <span className={`absolute left-3 top-3 ${formErrors.email ? "text-red-500" : "text-gray-400"}`}>
    ✉️
  </span>

  <input
    className={`w-full pl-10 pr-3 py-2 border rounded-xl text-sm focus:ring-2 outline-none transition
      <input data-testid="delivery-email" ... />
      ${formErrors.email 
        ? "border-red-500 focus:ring-red-400" 
        : "border-gray-300 focus:ring-pink-400"}
    `}
    placeholder="Email Address"
    value={email}
    onChange={(e) => setEmail(e.target.value)}
  />

  {formErrors.email && (
    <p className="text-red-500 text-xs mt-1 ml-1">
      {formErrors.email}
    </p>
  )}
</div>

         <div className="relative">
  <span className={`absolute left-3 top-3 ${formErrors.address ? "text-red-500" : "text-gray-400"}`}>
    📍
  </span>

  <textarea
    rows={2}
    className={`w-full pl-10 pr-3 py-2 border rounded-xl text-sm focus:ring-2 outline-none transition resize-none
      <textarea data-testid="delivery-address" ... />
      ${formErrors.address 
        ? "border-red-500 focus:ring-red-400" 
        : "border-gray-300 focus:ring-pink-400"}
    `}
    placeholder="Full Address"
    value={address}
    onChange={(e) => setAddress(e.target.value)}
  />

  {formErrors.address && (
    <p className="text-red-500 text-xs mt-1 ml-1">
      {formErrors.address}
    </p>
  )}
</div>

          {/* LOCATION BUTTON */}
          <button
            onClick={handleUseLocation}
            className="w-full bg-gradient-to-r from-pink-500 to-rose-500 text-white py-2.5 rounded-xl text-sm font-semibold hover:opacity-90 transition shadow-md"
          >
            📍 Detect My Precise Location
          </button>

         <div className="relative">
  <span className={`absolute left-3 top-3 ${formErrors.city ? "text-red-500" : "text-gray-400"}`}>
    🏙️
  </span>

  <input
    className={`w-full pl-10 pr-3 py-2 border rounded-xl text-sm focus:ring-2 outline-none transition
      <input data-testid="delivery-city" ... />
      ${formErrors.city 
        ? "border-red-500 focus:ring-red-400" 
        : "border-gray-300 focus:ring-pink-400"}
    `}
    placeholder="City"
    value={city}
    onChange={(e) => setCity(e.target.value)}
  />

  {formErrors.city && (
    <p className="text-red-500 text-xs mt-1 ml-1">
      {formErrors.city}
    </p>
  )}
</div>

        </div>

        {/* FOOTER */}
        <div className="flex justify-between items-center mt-6">

          <button
            onClick={() => setCheckoutStep("none")}
            className="text-gray-500 text-sm hover:text-black transition"
          >
            Cancel
          </button>

          <button
           data-testid="delivery-continue"
            onClick={() => {
              
              if (validateDeliveryForm()) {
                setCheckoutStep("payment");
              }
            }}
            className="bg-black text-white px-7 py-2.5 rounded-xl text-sm font-semibold hover:bg-gray-900 transition shadow-lg"
          >
            Continue →
          </button>

        </div>

      </div>
    </div>
  </div>
)}
     {/* ================= PAYMENT SELECTION ================= */}
{checkoutStep === "payment" && (
  <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-50">

    <div className="bg-white w-[480px] max-w-[95%] rounded-3xl shadow-2xl overflow-hidden animate-scaleIn">

      {/* Gradient Header Strip */}
      <div className="h-2 bg-gradient-to-r from-pink-500 via-rose-400 to-pink-500"></div>

      <div className="p-8">

        {/* STEP INDICATOR */}
<div className="flex items-center justify-center mb-6">

  {/* Step 1 */}
  <div className="flex items-center">
    <div className="w-8 h-8 flex items-center justify-center rounded-full 
      bg-gray-300 text-gray-600 text-sm font-semibold">
      1
    </div>
    <span className="ml-2 text-sm font-medium text-gray-500">
      Delivery Details
    </span>
  </div>

  {/* Line */}
  <div className="w-12 h-[2px] bg-gray-300 mx-4"></div>

  {/* Step 2 */}
  <div className="flex items-center">
    <div className="w-8 h-8 flex items-center justify-center rounded-full 
      bg-pink-500 text-white text-sm font-semibold">
      2
    </div>
    <span className="ml-2 text-sm font-medium text-pink-600">
      Payment Method
    </span>
  </div>

</div>

        {/* Title */}
        <h2 className="text-2xl font-bold text-center mb-8 text-gray-800">
          Choose Payment Method
        </h2>

        <div className="space-y-5">

     {/* eSewa */}
<button
  onClick={async () => {
    if (!validateDeliveryForm()) return;

    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/login");
      return;
    }

    try {
      const createOrderRes = await fetch(
        "http://localhost:5050/api/orders",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            items: cart,
            totalAmount: total,
            paymentMethod: "ESEWA",
            address: {
              name: fullName,
              phone,
              address,
              city,
            },
          }),
        }
      );

      const orderData = await createOrderRes.json();
      const orderId = orderData.data._id;

      const transaction_uuid = "TXN" + Date.now();
      const total_amount = total;

      const res = await fetch("/api/esewa", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          total_amount,
          transaction_uuid,
        }),
      });

      const data = await res.json();

      const form = document.createElement("form");
      form.method = "POST";
      form.action =
        "https://rc-epay.esewa.com.np/api/epay/main/v2/form";

      const fields = {
        amount: total_amount,
        tax_amount: 0,
        total_amount: total_amount,
        transaction_uuid,
        product_code: data.product_code,
        product_service_charge: 0,
        product_delivery_charge: 0,
        success_url: `http://localhost:3000/payment?id=${orderId}`,
        failure_url: `http://localhost:3000/payment-failure?id=${orderId}`,
        signed_field_names:
          "total_amount,transaction_uuid,product_code",
        signature: data.signature,
      };

      Object.entries(fields).forEach(([key, value]) => {
        const input = document.createElement("input");
        input.type = "hidden";
        input.name = key;
        input.value = String(value);
        form.appendChild(input);
      });

      document.body.appendChild(form);
      form.submit();

    } catch (err) {
      console.error("Payment error:", err);
      alert("Something went wrong");
    }
  }}
  className="w-full group border border-gray-200 bg-white hover:bg-gray-50 rounded-2xl p-5 transition-all duration-300 shadow-sm hover:shadow-lg flex items-center justify-between"
>
  <div className="flex items-center gap-4">

   {/* ICON */}
<div className="w-12 h-12 rounded-xl bg-white border border-gray-200 flex items-center justify-center shadow-sm">
  <img
    src="https://esewa.com.np/common/images/esewa-icon-large.png"
    alt="eSewa"
    className="w-8 h-8 object-contain"
  />
</div>

    {/* TEXT */}
    <div className="text-left">
      <p className="font-semibold text-lg text-gray-800">
        Pay with eSewa
      </p>
      <p className="text-sm text-gray-500">
        Fast • Secure • Instant Confirmation
      </p>
    </div>

  </div>

  <span className="text-gray-400 text-lg group-hover:text-gray-600 group-hover:translate-x-1 transition">
    →
  </span>
</button>

     {/* COD */}
<button
 data-testid="payment-cod"
  onClick={async () => {
    if (!validateDeliveryForm()) return;

    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/login");
      return;
    }

    try {
      const res = await fetch(
        "http://localhost:5050/api/orders",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            items: cart,
            totalAmount: total,
            paymentMethod: "COD",
            address: {
              name: fullName,
              phone,
              address,
              city,
            },
            orderStatus: "Order Placed",
          }),
        }
      );

      const data = await res.json();

      if (!data.success) {
        alert("Order creation failed");
        return;
      }

      setCreatedOrderId(data.data._id);
      setShowCodConfirm(true);

    } catch (err) {
      console.error("COD error:", err);
      alert("Something went wrong");
    }
  }}
  className="w-full bg-gradient-to-r from-gray-800 to-gray-900 text-white py-3 rounded-2xl font-semibold tracking-wide shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
>
  🚚 Cash on Delivery
</button>
{showCodConfirm && (
  <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">

    <div className="bg-white w-[420px] max-w-[95%] p-8 rounded-3xl shadow-2xl text-center">

      <div className="w-14 h-14 mx-auto mb-5 rounded-full bg-yellow-100 flex items-center justify-center text-2xl">
        🚚
      </div>

      <h2 className="text-xl font-bold mb-3 text-gray-800">
        Confirm Your Order
      </h2>

      <p className="text-sm text-gray-500 mb-8 leading-relaxed">
        Do you want to confirm this Cash on Delivery order?
      </p>

      <div className="flex justify-center gap-4">

        <button
        
          onClick={() => {
            setShowCodConfirm(false);
          }}
          className="px-6 py-2 rounded-xl border border-gray-300 text-gray-600 hover:bg-gray-100 transition-all duration-200"
        >
          No
        </button>

        <button
         data-testid="confirm-cod"
          onClick={() => {
            setShowCodConfirm(false);
            router.push(`/payment?id=${createdOrderId}&method=cod`);
          }}
          className="px-6 py-2 rounded-xl bg-black text-white shadow-md hover:bg-gray-900 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
        >
          Yes, Confirm
        </button>

      </div>

    </div>
  </div>
)}
</div>
</div>
</div>

</div>
)}
</div>
</div>
  )
}
