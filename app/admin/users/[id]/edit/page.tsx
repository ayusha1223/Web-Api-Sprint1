"use client";

import AdminGuard from "@/app/components/AdminGuard";
import { useParams } from "next/navigation";


export default function EditUserPage() {
  const params = useParams();

  return (
    <AdminGuard>
      <h1>Edit User</h1>
      <p>Editing User ID: {params.id}</p>
    </AdminGuard>
  );
}
