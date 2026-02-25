"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import AdminGuard from "../../../components/AdminGuard";
import toast from "react-hot-toast";

export default function CreateUserPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      const formData = new FormData();
      formData.append("name", name);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("role", role);
      formData.append("phone", phone);

      if (image) formData.append("image", image);

      const res = await fetch("http://localhost:5050/api/admin/users", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Create failed");
        return;
      }

      toast.success("User created successfully!");
      router.push("/admin/users");
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

 return (
  <AdminGuard>
    <div className="min-h-screen bg-gray-100 px-10 py-12">

      {/* HEADER */}
      <div className="mb-10">
        <h1 className="text-3xl font-bold mb-2">
          Create New User
        </h1>
        <p className="text-gray-500">
          Add a new user or administrator to your system
        </p>
      </div>

      {/* FORM */}
      <form
        onSubmit={handleSubmit}
        className="max-w-3xl space-y-8"
      >

        {/* GRID SECTION */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

          {/* NAME */}
          <div>
            <label className="block text-sm font-semibold mb-2">
              Full Name
            </label>
            <input
              type="text"
              placeholder="Enter full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-black outline-none transition"
            />
          </div>
          {/* PHONE */}
<div>
  <label className="block text-sm font-semibold mb-2">
    Phone Number
  </label>
  <input
    type="text"
    placeholder="Enter phone number"
    value={phone}
    onChange={(e) => setPhone(e.target.value)}
    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-black outline-none transition"
  />
</div>

          {/* EMAIL */}
          <div>
            <label className="block text-sm font-semibold mb-2">
              Email Address
            </label>
            <input
              type="email"
              placeholder="Enter email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-black outline-none transition"
            />
          </div>

          {/* PASSWORD */}
          <div>
            <label className="block text-sm font-semibold mb-2">
              Temporary Password
            </label>
            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-black outline-none transition"
            />
          </div>

          {/* ROLE */}
          <div>
            <label className="block text-sm font-semibold mb-2">
              Role
            </label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-black outline-none transition"
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>

        </div>

        {/* IMAGE UPLOAD SECTION */}
<div>
  <label className="block text-sm font-semibold mb-3">
    Profile Image
  </label>

  {/* Preview */}
  {preview && (
    <div className="mb-4 flex justify-center">
      <img
        src={preview}
        className="w-24 h-24 object-cover rounded-full border-4 border-gray-200 shadow"
      />
    </div>
  )}

  {/* Upload Box */}
  <label className="flex items-center justify-center border-2 border-dashed border-gray-300 rounded-xl py-10 cursor-pointer hover:border-black transition">
    <span className="text-gray-500">
      Click to upload profile image
    </span>

    <input
      type="file"
      accept="image/*"
      hidden
      onChange={(e) => {
        const file = e.target.files?.[0];
        if (file) {
          setImage(file);
          setPreview(URL.createObjectURL(file));
        }
      }}
    />
  </label>
</div>

        {/* ACTION BUTTONS */}
        <div className="flex gap-4 pt-6">

          <button
            type="submit"
            disabled={loading}
            className="px-8 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition disabled:opacity-50"
          >
            {loading ? "Creating..." : "Create User"}
          </button>

          <button
            type="button"
            onClick={() => router.push("/admin/users")}
            className="px-8 py-3 border border-gray-300 rounded-lg hover:bg-gray-200 transition"
          >
            Cancel
          </button>

        </div>

      </form>
    </div>
  </AdminGuard>
);
}