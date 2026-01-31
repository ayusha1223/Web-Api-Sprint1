"use client";

import AdminGuard from "@/app/components/AdminGuard";
import { useState } from "react";


export default function CreateUserPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("role", "user");

    await fetch("http://localhost:5050/api/auth/user", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    alert("User created");
  };

  return (
    <AdminGuard>
      <h1>Create User</h1>

      <form onSubmit={handleSubmit}>
        <input placeholder="Name" onChange={(e) => setName(e.target.value)} />
        <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
        <input
          placeholder="Password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Create</button>
      </form>
    </AdminGuard>
  );
}
