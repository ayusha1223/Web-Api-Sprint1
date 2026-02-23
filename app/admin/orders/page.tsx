"use client";

import { useEffect, useState } from "react";

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch(
        "http://localhost:5050/api/orders",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!res.ok) {
        console.error("Fetch failed:", res.status);
        setOrders([]);
        return;
      }

      const data = await res.json();

      if (data.success) {
        setOrders(data.data);
      } else {
        setOrders([]);
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

  const updateStatus = async (
    orderId: string,
    status: string
  ) => {
    const token = localStorage.getItem("token");

    try {
      const res = await fetch(
        `http://localhost:5050/api/orders/admin/${orderId}/status`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ status }),
        }
      );

      const data = await res.json();

      if (data.success) {
        fetchOrders(); // refresh table
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Status update error:", error);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div style={{ padding: 40 }}>
      <h2>Admin Orders</h2>

      <table
        style={{
          width: "100%",
          marginTop: 20,
          borderCollapse: "collapse",
        }}
      >
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Total</th>
            <th>Payment Method</th>
            <th>Payment Status</th>
            <th>Order Status</th>
            <th>Date</th>
          </tr>
        </thead>

        <tbody>
          {orders.length === 0 ? (
            <tr>
              <td colSpan={6}>No orders found</td>
            </tr>
          ) : (
            orders.map((o: any) => (
              <tr key={o._id}>
                <td>{o._id}</td>
                <td>₹{o.totalAmount}</td>
                <td>{o.paymentMethod}</td>
                <td>
                  <span
                    style={{
                      color:
                        o.paymentStatus === "Paid"
                          ? "green"
                          : "orange",
                      fontWeight: "bold",
                    }}
                  >
                    {o.paymentStatus}
                  </span>
                </td>

                {/* STATUS CONTROL */}
                <td>
                  <select
                    value={o.orderStatus}
                    onChange={(e) =>
                      updateStatus(
                        o._id,
                        e.target.value
                      )
                    }
                    style={{
                      padding: "5px",
                      borderRadius: "6px",
                    }}
                  >
                    <option>
                      Processing
                    </option>
                    <option>Shipped</option>
                    <option>
                      Delivered
                    </option>
                    <option>
                      Cancel Requested
                    </option>
                    <option>
                      Cancelled
                    </option>
                    <option>
                      Refunded
                    </option>
                  </select>
                </td>

                <td>
                  {new Date(
                    o.createdAt
                  ).toLocaleString()}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}