"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import AdminGuard from "../../../components/AdminGuard";

type User = {
  _id: string;
  name: string;
  email: string;
  role: string;
  imageUrl?: string;
};

export default function AdminUserDetailPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [user, setUser] = useState<User | null>(null);
  const [orders, setOrders] = useState<any[]>([]);
  const [payments, setPayments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token || !id) return;

    fetch(`http://localhost:5050/api/admin/users/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((res) => {
        setUser(res.data.user);
        setOrders(res.data.orders || []);
        setPayments(res.data.payments || []);
      })
      .catch((err) => {
        console.error(err);
        setUser(null);
      })
      .finally(() => setLoading(false));
  }, [id]);

 return (
  <AdminGuard>
    <div className="min-h-screen bg-gray-50 px-6 pt-6 pb-16">

      <div className="max-w-6xl mx-auto space-y-8">

        {/* HEADER */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">
              User Details
            </h1>
            <p className="text-gray-500 mt-1">
              Complete profile, orders and payments
            </p>
          </div>

          <button
            onClick={() => router.push(`/admin/users/${user?._id}/edit`)}
            className="px-5 py-2.5 bg-black text-white rounded-lg hover:bg-gray-800 transition"
          >
            Edit User
          </button>
        </div>

        {loading ? (
          <div className="bg-white rounded-xl shadow-sm p-10 text-center text-gray-500">
            Loading user...
          </div>
        ) : !user ? (
          <div className="bg-white rounded-xl shadow-sm p-10 text-center text-gray-500">
            User not found.
          </div>
        ) : (
          <>
            {/* PROFILE CARD */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">

              <div className="flex items-center gap-8">

                {/* Avatar */}
                <div className="relative">
                  <div className="w-28 h-28 rounded-full overflow-hidden ring-4 ring-white shadow-lg">
                    <img
  src={
    user.imageUrl
      ? `http://localhost:5050${user.imageUrl}`
      : "/user-placeholder.png"
  }
  className="w-full h-full object-cover"
/>
                  </div>
                </div>

                {/* Info */}
                <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6">

                  <div>
                    <p className="text-sm text-gray-400 uppercase tracking-wide">
                      Name
                    </p>
                    <p className="text-xl font-semibold text-gray-800">
                      {user.name}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-400 uppercase tracking-wide">
                      Email
                    </p>
                    <p className="text-lg font-medium text-gray-700">
                      {user.email}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-400 uppercase tracking-wide">
                      Role
                    </p>
                    <span
                      className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${
                        user.role === "admin"
                          ? "bg-pink-100 text-pink-600"
                          : "bg-indigo-100 text-indigo-600"
                      }`}
                    >
                      {user.role}
                    </span>
                  </div>

                  <div>
                    <p className="text-sm text-gray-400 uppercase tracking-wide">
                      User ID
                    </p>
                    <p className="text-xs font-mono bg-gray-100 px-3 py-2 rounded-lg break-all">
                      {user._id}
                    </p>
                  </div>

                </div>
              </div>
            </div>

            {/* ORDERS */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
              <h3 className="text-xl font-semibold mb-6 text-gray-800">
                Order History
              </h3>

              {orders.length === 0 ? (
                <p className="text-gray-500">No orders found</p>
              ) : (
                <div className="space-y-4">
                  {orders.map((order) => (
                    <div
                      key={order._id}
                      className="flex justify-between items-center p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition"
                    >
                      <div>
                        <p className="font-medium text-gray-800">
                          Order ID: {order._id}
                        </p>
                        <p className="text-sm text-gray-500">
                          Total: Rs {order.totalAmount}
                        </p>
                      </div>

                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          order.paymentStatus === "paid"
                            ? "bg-green-100 text-green-600"
                            : "bg-yellow-100 text-yellow-600"
                        }`}
                      >
                        {order.paymentStatus}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* PAYMENTS */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
              <h3 className="text-xl font-semibold mb-6 text-gray-800">
                Payment History
              </h3>

              {payments.length === 0 ? (
                <p className="text-gray-500">No payments found</p>
              ) : (
                <div className="space-y-4">
                  {payments.map((payment) => (
                    <div
                      key={payment._id}
                      className="flex justify-between items-center p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition"
                    >
                      <div>
                        <p className="font-medium text-gray-800">
                          Rs {payment.amount}
                        </p>
                        <p className="text-sm text-gray-500">
                          {payment.method}
                        </p>
                      </div>

                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          payment.status.toLowerCase() === "paid"
                            ? "bg-green-100 text-green-600"
                            : payment.status.toLowerCase() === "pending"
                            ? "bg-yellow-100 text-yellow-600"
                            : "bg-red-100 text-red-600"
                        }`}
                      >
                        {payment.status}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* BACK BUTTON */}
            <div>
              <button
                onClick={() => router.push("/admin/users")}
                className="px-5 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition"
              >
                Back to Users
              </button>
            </div>

          </>
        )}
      </div>
    </div>
  </AdminGuard>
);
}