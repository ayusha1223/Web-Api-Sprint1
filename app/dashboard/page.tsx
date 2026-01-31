"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const router = useRouter();

  useEffect(() => {
    const role = localStorage.getItem("role");

    if (role === "admin") {
      router.push("/admin/users");
    } else {
      router.push("/user/profile");
    }
  }, []);

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Redirecting...</p>
    </div>
  );
}
