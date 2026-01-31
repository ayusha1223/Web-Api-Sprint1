"use client";

import AdminGuard from "@/app/components/AdminGuard";



export default function AdminUsersPage() {
  return (
    <AdminGuard>
      <h1>Admin Users</h1>

      <table border={1}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Dummy User</td>
          </tr>
        </tbody>
      </table>
    </AdminGuard>
  );
}
