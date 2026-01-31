"use client";

import AdminGuard from "@/app/components/AdminGuard";
import { useParams } from "next/navigation";


export default function UserDetailPage() {
  const params = useParams();

  return (
    <AdminGuard>
      <h1>User Details</h1>
      <p>User ID: {params.id}</p>
    </AdminGuard>
  );
}
