"use client";

import { useEffect, useState } from "react";

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
    <div
      style={{
        padding: "40px",
        background: "#f5f5f5",
        minHeight: "100vh",
      }}
    >
      <h1 style={{ color: "#e91e63", marginBottom: "20px" }}>
        My Orders
      </h1>

      {orders.length === 0 && <p>No orders found.</p>}

      {orders.map((order) => (
        <div
          key={order._id}
          style={{
            background: "#fff",
            padding: "20px",
            marginBottom: "20px",
            borderRadius: "8px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
          }}
        >
          {/* ===== TOP SECTION ===== */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              borderBottom: "1px solid #eee",
              paddingBottom: "10px",
              marginBottom: "15px",
            }}
          >
            <div>
              <p>
                <strong>Order Number:</strong> {order._id}
              </p>
              <p>
                Ordered Time:{" "}
                {new Date(order.createdAt).toLocaleString()}
              </p>
            </div>

            <span
              style={{
                fontWeight: "bold",
                padding: "6px 10px",
                borderRadius: "6px",
                background:
                  order.orderStatus === "Delivered"
                    ? "#e6ffed"
                    : order.orderStatus === "Cancelled"
                    ? "#ffe6e6"
                    : order.orderStatus === "Refunded"
                    ? "#e6f0ff"
                    : "#fff0f5",
                color:
                  order.orderStatus === "Delivered"
                    ? "green"
                    : order.orderStatus === "Cancelled"
                    ? "red"
                    : order.orderStatus === "Refunded"
                    ? "#0066ff"
                    : "#e91e63",
              }}
            >
              {order.orderStatus}
            </span>
          </div>

          {/* ===== PRODUCT IMAGES ===== */}
          <div
            style={{
              display: "flex",
              gap: "15px",
              marginBottom: "15px",
            }}
          >
            {order.items.map((item, index) => (
              <div
                key={index}
                style={{ position: "relative" }}
              >
                <img
                  src={item.img}
                  alt="product"
                  width={80}
                  height={100}
                  style={{ borderRadius: "6px" }}
                />

                <span
                  style={{
                    position: "absolute",
                    top: "-8px",
                    right: "-8px",
                    background: "#e91e63",
                    color: "#fff",
                    borderRadius: "50%",
                    width: "22px",
                    height: "22px",
                    fontSize: "12px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {item.qty}
                </span>
              </div>
            ))}
          </div>

          {/* ===== ORDER INFO ===== */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: "20px",
              alignItems: "center",
            }}
          >
            <div>
              <p>Payment Method: {order.paymentMethod}</p>
              <p>
                Payment Status:{" "}
                <span
                  style={{
                    color:
                      order.paymentStatus === "Paid"
                        ? "green"
                        : "orange",
                  }}
                >
                  {order.paymentStatus}
                </span>
              </p>
              <p>Total Items: {order.items.length}</p>
              <p>
                <strong>
                  Total Amount: Rs. {order.totalAmount}
                </strong>
              </p>
            </div>

            {/* ===== CANCEL BUTTON ===== */}
            {order.orderStatus === "Processing" && (
              <button
                onClick={() =>
                  handleCancelRequest(order._id)
                }
                style={{
                  background: "red",
                  color: "white",
                  padding: "8px 14px",
                  border: "none",
                  borderRadius: "6px",
                  cursor: "pointer",
                }}
              >
                Cancel Order
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}