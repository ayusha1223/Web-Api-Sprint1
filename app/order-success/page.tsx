"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function OrderSuccessPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const orderId = searchParams.get("id");

  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        if (!orderId) {
          setError("Invalid order ID");
          setLoading(false);
          return;
        }

        const token = localStorage.getItem("token");

        if (!token) {
          router.push("/login");
          return;
        }

        const res = await fetch(
          `http://localhost:5050/api/orders/${orderId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (res.status === 401) {
          setError("Unauthorized access");
          setLoading(false);
          return;
        }

        const data = await res.json();

        if (!data.success) {
          setError("Order not found");
          setLoading(false);
          return;
        }

        setOrder(data.data);
        setLoading(false);
      } catch (err) {
        console.error("Fetch error:", err);
        setError("Something went wrong");
        setLoading(false);
      }
    };

    fetchOrder();
  }, [orderId, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-100 via-white to-slate-200">
        <div className="bg-white/70 backdrop-blur-xl p-10 rounded-3xl shadow-2xl text-center">
          <h2 className="text-2xl font-semibold mb-2">
            Fetching order details...
          </h2>
          <p className="text-gray-500">Please wait...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-pink-100">
        <div className="bg-white p-10 rounded-3xl shadow-xl text-center">
          <h2 className="text-2xl font-semibold mb-6 text-red-600">
            {error}
          </h2>
          <button
            onClick={() => router.push("/")}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-orange-500 to-pink-600 text-white font-semibold shadow-lg hover:scale-105 transition"
          >
            Go Home
          </button>
        </div>
      </div>
    );
  }

  return (
  <div className="min-h-screen bg-white">

    {/* Top Success Banner */}
    <div className="bg-green-600 text-white py-6 text-center">
      <h1 className="text-3xl font-semibold">
        Order Confirmed 🎉
      </h1>
      <p className="text-sm opacity-90 mt-1">
        Thank you for shopping with us.
      </p>
    </div>

    {/* Main Container */}
    <div className="max-w-6xl mx-auto px-6 py-16">

      <div className="grid lg:grid-cols-3 gap-16">

        {/* LEFT SIDE - ORDER INFO */}
        <div className="lg:col-span-2">

          <h2 className="text-2xl font-semibold mb-8 border-b pb-4">
            Order Summary
          </h2>

          <div className="space-y-6 text-gray-700">

            <div className="flex justify-between">
              <span className="text-gray-500">Order ID</span>
              <span className="font-medium">{order._id}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-500">Total Paid</span>
              <span className="font-semibold text-lg">
                ₹{order.totalAmount}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-500">Payment Method</span>
              <span>{order.paymentMethod}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-500">Order Status</span>
              <span className="text-green-600 font-medium">
                {order.orderStatus}
              </span>
            </div>

          </div>

        </div>

        {/* RIGHT SIDE - DELIVERY */}
        <div>

          <h2 className="text-2xl font-semibold mb-8 border-b pb-4">
            Delivery Details
          </h2>

          <div className="text-gray-700 space-y-2">
            <p className="font-medium text-black">
              {order.address?.name}
            </p>
            <p>{order.address?.phone}</p>
            <p>{order.address?.address}</p>
            <p>{order.address?.city}</p>
          </div>

          <div className="mt-8 p-4 bg-gray-50 border rounded-md text-sm">
            Estimated Delivery:{" "}
            <span className="font-medium">
              3 – 5 Business Days
            </span>
          </div>

          <div className="mt-10 space-y-4">
            <button
  onClick={() => router.push("/dashboard")}
  className="w-full py-3 border border-gray-300 font-medium hover:bg-gray-100 transition"
>
  Continue Shopping
</button>

            <button
              onClick={() =>
                router.push(`/receipt?id=${order._id}`)
              }
              className="w-full py-3 bg-black text-white font-medium hover:bg-gray-800 transition"
            >
              View / Download Receipt
            </button>

            <button
              onClick={() =>
                router.push(`/track-order?id=${order._id}`)
              }
              className="w-full py-3 border border-gray-300 font-medium hover:bg-gray-100 transition"
            >
              Track Order
            </button>

          </div>

        </div>

      </div>

    </div>

  </div>
);
}