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
  <div className="min-h-screen bg-gray-100 p-10">

    {/* HEADER */}
    <div className="flex justify-between items-center mb-8">
      <div>
        <h2 className="text-3xl font-bold">
          Payments Overview
        </h2>
        <p className="text-gray-500 text-sm mt-1">
          Manage and monitor all transactions
        </p>
      </div>

      <div className="bg-white shadow-sm border border-gray-200 px-6 py-3 rounded-xl">
        <p className="text-sm text-gray-500">
          Total Payments
        </p>
        <p className="text-xl font-semibold">
          {payments.length}
        </p>
      </div>
    </div>

    {/* TABLE CARD */}
    <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">

      {loading ? (
        <div className="p-12 text-center text-gray-500">
          Loading payments...
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">

            <thead className="bg-gray-50 text-gray-600 uppercase text-xs tracking-wider">
              <tr>
                <th className="px-6 py-4 text-left">Order ID</th>
                <th className="px-6 py-4 text-left">User</th>
                <th className="px-6 py-4 text-left">Amount</th>
                <th className="px-6 py-4 text-left">Method</th>
                <th className="px-6 py-4 text-left">Status</th>
                <th className="px-6 py-4 text-left">Date</th>
              </tr>
            </thead>

            <tbody>
              {payments.length === 0 ? (
                <tr>
                  <td
                    colSpan={6}
                    className="text-center py-12 text-gray-400"
                  >
                    No payments found
                  </td>
                </tr>
              ) : (
                payments.map((p: any) => (
                  <tr
                    key={p._id}
                    className="border-t hover:bg-gray-50 transition"
                  >
                    <td className="px-6 py-4 font-medium text-gray-700">
                      {p.orderId?._id}
                    </td>

                    <td className="px-6 py-4 text-gray-600">
                      {p.userId?.email}
                    </td>

                    <td className="px-6 py-4 font-semibold text-gray-800">
                      ₹{p.amount}
                    </td>

                    <td className="px-6 py-4">
                      <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-600 text-xs font-medium">
                        {p.method}
                      </span>
                    </td>

                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          p.status.toLowerCase() === "paid"
                            ? "bg-green-100 text-green-600"
                            : p.status.toLowerCase() === "pending"
                            ? "bg-yellow-100 text-yellow-600"
                            : "bg-red-100 text-red-600"
                        }`}
                      >
                        {p.status}
                      </span>
                    </td>

                    <td className="px-6 py-4 text-gray-500 text-sm">
                      {new Date(p.createdAt).toLocaleString()}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  </div>
);
}