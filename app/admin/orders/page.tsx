"use client";

import { useEffect, useState } from "react";
import "./adminOrder.css";

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const limit = 8;

  const fetchOrders = async (pageNumber: number) => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch(
        `http://localhost:5050/api/orders?page=${pageNumber}&limit=${limit}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();

      if (data.success) {
        setOrders(data.data);
        setTotalPages(data.pagination.pages);
      }

    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders(page);
  }, [page]);

  const updateStatus = async (
    orderId: string,
    status: string
  ) => {
    const token = localStorage.getItem("token");

    await fetch(
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

    fetchOrders(page);
  };

  if (loading) return <div className="admin-loading">Loading...</div>;

  return (
    <div className="admin-container">
      <div className="admin-card">
        <h2 className="admin-title">Admin Orders</h2>

        <div className="table-wrapper">
          <table className="modern-table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Total</th>
                <th>Payment</th>
                <th>Status</th>
                <th>Order</th>
                <th>Date</th>
              </tr>
            </thead>

            <tbody>
              {orders.map((o: any) => (
                <tr key={o._id}>
                  <td className="order-id">
                    {o._id.slice(-8)}
                  </td>

                  <td>₹{o.totalAmount}</td>
                  <td>{o.paymentMethod}</td>

                  <td>
                    <span
                      className={`badge ${
                        o.paymentStatus === "Paid"
                          ? "paid"
                          : "pending"
                      }`}
                    >
                      {o.paymentStatus}
                    </span>
                  </td>

                  <td>
                    <select
                      className="status-select"
                      value={o.orderStatus}
                      onChange={(e) =>
                        updateStatus(
                          o._id,
                          e.target.value
                        )
                      }
                    >
                      <option>Processing</option>
                      <option>Shipped</option>
                      <option>Delivered</option>
                      <option>Cancel Requested</option>
                      <option>Cancelled</option>
                      <option>Refunded</option>
                    </select>
                  </td>

                  <td>
                    {new Date(
                      o.createdAt
                    ).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* PAGINATION */}
        <div className="pagination">
          <button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
          >
            Previous
          </button>

          <span>
            Page {page} of {totalPages}
          </span>

          <button
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}