"use client";
import { useParams } from "next/navigation";
import { useState } from "react";

export default function ResetPassword() {
  const { token } = useParams();
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const res = await fetch(
      "http://localhost:5050/api/auth/reset-password",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          token,
          newPassword: password,
        }),
      }
    );

    const data = await res.json();
    alert(data.message);
  };

  return (
    <div style={{ padding: 50 }}>
      <h1>Reset Password</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          placeholder="New password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Reset Password</button>
      </form>
    </div>
  );
}
