"use client";

import { useEffect, useState } from "react";

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await fetch("http://localhost:5050/api/orders", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();

        console.log("ORDERS RESPONSE:", data);

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

    fetchOrders();
  }, []);

  return (
    <div>
      <h2>Orders</h2>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <table style={{ width: "100%", marginTop: 20 }}>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Total</th>
              <th>Payment</th>
              <th>Status</th>
              <th>Date</th>
            </tr>
          </thead>

          <tbody>
            {orders.length === 0 ? (
              <tr>
                <td colSpan={5}>No orders found</td>
              </tr>
            ) : (
              orders.map((o: any) => (
                <tr key={o._id}>
                  <td>{o._id}</td>
                  <td>₹{o.totalAmount}</td>
                  <td>{o.paymentMethod}</td>
                  <td>{o.paymentStatus}</td>
                  <td>
                    {new Date(o.createdAt).toLocaleString()}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}
