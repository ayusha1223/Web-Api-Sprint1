"use client";

import { useEffect, useState } from "react";
import TopBar from "../components/TopBar";

interface OrderItem {
  img: string;
  qty: number;
  price: number;
  size: string;
}

interface Order {
  _id: string;
  createdAt: string;
  paymentMethod: string;
  paymentStatus: string;
  orderStatus: string;
  totalAmount: number;
  items: OrderItem[];
}

export default function MyOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(
        "http://localhost:5050/api/orders/my-orders",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();

      if (data.success) {
        setOrders(data.orders);
      }
    } catch (error) {
      console.error("Fetch orders error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleCancelRequest = async (orderId: string) => {
    const token = localStorage.getItem("token");

    if (!token) return;

    try {
      const res = await fetch(
        `http://localhost:5050/api/orders/${orderId}/cancel-request`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();

      if (data.success) {
        alert("Cancel request sent to admin");
        fetchOrders();
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Cancel request error:", error);
    }
  };

  if (loading)
    return <p style={{ padding: 40 }}>Loading orders...</p>;

  return (
  <div className="min-h-screen bg-[#f8f6f3]">

    {/* TOPBAR */}
    <TopBar />

    <div className="max-w-6xl mx-auto px-6 py-12">

      <h1 className="text-3xl font-serif tracking-wide text-gray-900 mb-10">
        My Orders
      </h1>

      {orders.length === 0 && (
        <div className="bg-white rounded-2xl p-12 text-center shadow-sm">
          <p className="text-gray-500 text-lg">No orders found.</p>
        </div>
      )}

      {orders.map((order) => (
        <div
          key={order._id}
          className="bg-white rounded-2xl p-8 mb-8 shadow-sm hover:shadow-md transition"
        >
          {/* ===== HEADER SECTION ===== */}
          <div className="flex flex-col md:flex-row md:justify-between md:items-center border-b pb-6 mb-6 gap-4">

            <div className="space-y-1">
              <p className="text-sm text-gray-500">
                Order ID
              </p>
              <p className="font-medium text-gray-900">
                {order._id}
              </p>
              <p className="text-sm text-gray-500">
                {new Date(order.createdAt).toLocaleString()}
              </p>
            </div>

            <span
              className={`px-4 py-2 rounded-full text-sm font-medium ${
                order.orderStatus === "Delivered"
                  ? "bg-green-100 text-green-700"
                  : order.orderStatus === "Cancelled"
                  ? "bg-red-100 text-red-600"
                  : order.orderStatus === "Refunded"
                  ? "bg-blue-100 text-blue-600"
                  : "bg-pink-100 text-pink-600"
              }`}
            >
              {order.orderStatus}
            </span>

          </div>

          {/* ===== PRODUCT SECTION ===== */}
          <div className="flex flex-wrap gap-6 mb-8">
            {order.items.map((item, index) => (
              <div key={index} className="relative">

                <img
                  src={item.img}
                  alt="product"
                  className="w-24 h-32 object-cover rounded-xl shadow-sm"
                />

                <span className="absolute -top-2 -right-2 bg-black text-white text-xs w-6 h-6 flex items-center justify-center rounded-full">
                  {item.qty}
                </span>

              </div>
            ))}
          </div>

          {/* ===== ORDER DETAILS ===== */}
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-6">

            <div className="space-y-2 text-sm text-gray-600">
              <p>
                Payment Method:{" "}
                <span className="font-medium text-gray-900">
                  {order.paymentMethod}
                </span>
              </p>

              <p>
                Payment Status:{" "}
                <span
                  className={`font-medium ${
                    order.paymentStatus === "Paid"
                      ? "text-green-600"
                      : "text-orange-500"
                  }`}
                >
                  {order.paymentStatus}
                </span>
              </p>

              <p>Total Items: {order.items.length}</p>

              <p className="text-lg font-semibold text-gray-900 mt-2">
                ₹{order.totalAmount}
              </p>
            </div>

            {/* CANCEL BUTTON */}
            {order.orderStatus === "Processing" && (
              <button
                onClick={() =>
                  handleCancelRequest(order._id)
                }
                className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition shadow-sm"
              >
                Cancel Order
              </button>
            )}

          </div>
        </div>
      ))}
    </div>
  </div>
);
}