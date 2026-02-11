"use client";

import { useEffect, useState } from "react";

export default function AdminDashboard() {
  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch("http://localhost:5050/api/admin/dashboard", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setStats(data.data));
  }, []);

  if (!stats) return <p style={{ padding: 40 }}>Loading...</p>;

  return (
    <div style={{ padding: "40px" }}>
      <h1>Admin Dashboard</h1>

      <div style={{ display: "flex", gap: 20, marginTop: 30 }}>
        <Card title="Total Users" value={stats.totalUsers} />
        <Card title="Total Orders" value={stats.totalOrders} />
        <Card title="Revenue" value={`₹ ${stats.totalRevenue}`} />
        <Card title="Pending Payments" value={stats.pendingPayments} />
      </div>
    </div>
  );
}

function Card({ title, value }: any) {
  return (
    <div
      style={{
        flex: 1,
        background: "#fff",
        padding: 20,
        borderRadius: 12,
        boxShadow: "0 5px 15px rgba(0,0,0,0.05)",
      }}
    >
      <h3>{title}</h3>
      <h2 style={{ marginTop: 10 }}>{value}</h2>
    </div>
  );
}
