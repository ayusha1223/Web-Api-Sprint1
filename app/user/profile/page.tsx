"use client";

import axios from "@/app/lib/api/axios";
import { useState } from "react";


export default function ProfilePage() {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const [name, setName] = useState(user.name);
  const [image, setImage] = useState<File | null>(null);

  const submitHandler = async () => {
    const formData = new FormData();
    formData.append("name", name);
    if (image) formData.append("image", image);

    await axios.put(`/api/auth/${user.id}`, formData);
    alert("Profile updated");
  };

  return (
    <div>
      <h1>User Profile</h1>

      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        type="file"
        onChange={(e) => setImage(e.target.files?.[0] || null)}
      />

      <button onClick={submitHandler}>Update</button>
    </div>
  );
}
