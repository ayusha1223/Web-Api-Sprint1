"use client";

import { useEffect, useState } from "react";
import {
  Users,
  ShoppingCart,
  DollarSign,
  Clock,
} from "lucide-react";

import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";

export default function AdminDashboard() {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch("http://localhost:5050/api/admin/dashboard", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        setStats(data.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500 text-lg">
        Loading dashboard...
      </div>
    );

  if (!stats)
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        Failed to load dashboard
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto">

        {/* HEADER */}
        <h1 className="text-3xl font-bold mb-10">
          Dashboard Overview
        </h1>

        {/* ================= STAT CARDS ================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">

          <StatCard
            title="Total Users"
            value={stats.totalUsers}
            icon={<Users size={22} />}
          />

          <StatCard
            title="Total Orders"
            value={stats.totalOrders}
            icon={<ShoppingCart size={22} />}
          />

          <StatCard
            title="Revenue"
            value={`₹ ${stats.totalRevenue}`}
            icon={<DollarSign size={22} />}
          />

          <StatCard
            title="Pending Payments"
            value={stats.pendingPayments}
            icon={<Clock size={22} />}
          />

        </div>

        {/* ================= ANALYTICS ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

          {/* Revenue Chart */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-lg font-semibold mb-6">
              Revenue Growth
            </h2>

            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={stats.revenueByMonth || []}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="#000"
                  strokeWidth={3}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Orders Chart */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-lg font-semibold mb-6">
              Orders This Week
            </h2>

            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={stats.ordersThisWeek || []}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Bar
                  dataKey="orders"
                  fill="#000"
                  radius={[6, 6, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>

        </div>

      </div>
    </div>
  );
}

/* ================= STAT CARD ================= */

function StatCard({ title, value, icon }: any) {
  return (
    <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition duration-300">

      <div className="flex items-center justify-between">
        <h3 className="text-gray-500 text-sm uppercase tracking-wide">
          {title}
        </h3>

        <div className="text-gray-400">
          {icon}
        </div>
      </div>

      <div className="mt-4 text-3xl font-bold text-gray-900">
        {value}
      </div>

    </div>
  );
}