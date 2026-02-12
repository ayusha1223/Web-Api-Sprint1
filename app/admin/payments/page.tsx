"use client";

import { useEffect, useState } from "react";

export default function PaymentsPage() {
  const [payments, setPayments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await fetch("http://localhost:5050/api/payment", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();

        console.log("PAYMENTS RESPONSE:", data);

        if (Array.isArray(data)) {
          setPayments(data);
        } else {
          setPayments([]);
        }

      } catch (error) {
        console.error("Fetch payments error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPayments();
  }, []);

  return (
    <div>
      <h2>Payments</h2>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <table style={{ width: "100%", marginTop: 20 }}>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>User</th>
              <th>Amount</th>
              <th>Method</th>
              <th>Status</th>
              <th>Date</th>
            </tr>
          </thead>

          <tbody>
            {payments.length === 0 ? (
              <tr>
                <td colSpan={6}>No payments found</td>
              </tr>
            ) : (
              payments.map((p: any) => (
                <tr key={p._id}>
                  <td>{p.orderId?._id}</td>
                  <td>{p.userId?.email}</td>
                  <td>₹{p.amount}</td>
                  <td>{p.method}</td>
                  <td>{p.status}</td>
                  <td>
                    {new Date(p.createdAt).toLocaleString()}
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
