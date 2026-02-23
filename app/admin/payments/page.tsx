"use client";

import { useEffect, useState } from "react";
import "./payment.css";

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

        if (data.success) {
          setPayments(data.data);
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

  const getStatusClass = (status: string) => {
    if (status.toLowerCase() === "paid") return "status-paid";
    if (status.toLowerCase() === "pending") return "status-pending";
    return "status-failed";
  };

  return (
    <div className="payment-page">
      <div className="payment-header">
        <h2>Payments Overview</h2>
        <div className="payment-count">
          Total Payments: {payments.length}
        </div>
      </div>

      <div className="payment-card">
        {loading ? (
          <p>Loading payments...</p>
        ) : (
          <table className="payment-table">
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
                  <td colSpan={6} className="no-data">
                    No payments found
                  </td>
                </tr>
              ) : (
                payments.map((p: any) => (
                  <tr key={p._id}>
                    <td>{p.orderId?._id}</td>
                    <td>{p.userId?.email}</td>
                    <td>₹{p.amount}</td>
                    <td>
                      <span className="method-badge">
                        {p.method}
                      </span>
                    </td>
                    <td>
                      <span className={getStatusClass(p.status)}>
                        {p.status}
                      </span>
                    </td>
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
    </div>
  );
}