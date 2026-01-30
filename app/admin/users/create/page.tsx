"use client";

import axios from "@/app/lib/api/axios";
import { useState } from "react";


export default function CreateUserPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
  });
  const [image, setImage] = useState<File | null>(null);

  const submitHandler = async () => {
    const formData = new FormData();

    Object.entries(form).forEach(([key, value]) =>
      formData.append(key, value)
    );

    if (image) formData.append("image", image);

    await axios.post("/api/auth/user", formData);
    alert("User created");
  };

  return (
    <div>
      <h1>Create User</h1>

      <input placeholder="Name" onChange={(e) => setForm({ ...form, name: e.target.value })} />
      <input placeholder="Email" onChange={(e) => setForm({ ...form, email: e.target.value })} />
      <input placeholder="Password" type="password" onChange={(e) => setForm({ ...form, password: e.target.value })} />

      <select onChange={(e) => setForm({ ...form, role: e.target.value })}>
        <option value="user">User</option>
        <option value="admin">Admin</option>
      </select>

      <input type="file" onChange={(e) => setImage(e.target.files?.[0] || null)} />

      <button onClick={submitHandler}>Create</button>
    </div>
  );
}
