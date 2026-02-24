"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import "./order-success.css";

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
      <div className="successWrapper">
        <div className="successCard">
          <h2>Fetching order details...</h2>
          <p>Please wait...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="successWrapper">
        <div className="successCard">
          <h2>{error}</h2>
          <button
            className="primaryBtn"
            onClick={() => router.push("/")}
          >
            Go Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="successWrapper">
      <div className="successContainer">

        <div className="successHeader">
          <div className="checkIcon">✔</div>
          <div>
            <h1>Order Confirmed</h1>
            <p>Thank you for shopping with us.</p>
          </div>
        </div>

        <div className="successGrid">

          <div className="orderCard">
            <h3>Order Details</h3>

            <div className="infoRow">
              <span>Order ID</span>
              <strong>{order._id}</strong>
            </div>

            <div className="infoRow">
              <span>Total Paid</span>
              <strong>₹{order.totalAmount}</strong>
            </div>

            <div className="infoRow">
              <span>Payment</span>
              <strong>{order.paymentMethod}</strong>
            </div>

            <div className="infoRow">
              <span>Status</span>
              <span className="statusBadge">
                {order.orderStatus}
              </span>
            </div>
          </div>

          <div className="summaryCard">
            <h3>Delivery Info</h3>
            <p>{order.address?.name}</p>
            <p>{order.address?.phone}</p>
            <p>{order.address?.address}</p>
            <p>{order.address?.city}</p>

            <div className="deliveryBox">
              Estimated Delivery:
              <strong> 3 - 5 Business Days</strong>
            </div>

            <div className="buttonColumn">
              <button
                className="primaryBtn"
                onClick={() =>
                  router.push(`/receipt?id=${order._id}`)
                }
              >
                View / Download Receipt
              </button>

              <button
                className="secondaryBtn"
                onClick={() =>
                  router.push(`/track-order?id=${order._id}`)
                }
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