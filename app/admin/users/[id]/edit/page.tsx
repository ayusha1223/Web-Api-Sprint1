"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function EditUserPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  /* ================= LOAD USER ================= */
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token || !id) return;

    fetch(`http://localhost:5050/api/admin/users/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        const user = data.data.user;
        setName(user.name);
        setEmail(user.email);
        setRole(user.role);
        if (user.imageUrl) {
          setPreview(`http://localhost:5050${user.imageUrl}`);
        }
      })
      .finally(() => setLoading(false));
  }, [id]);

  /* ================= SAVE USER ================= */
  const handleSave = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    setSaving(true);

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("role", role);

    if (password) {
      formData.append("password", password);
    }

    if (imageFile) {
      formData.append("image", imageFile);
    }

    const res = await fetch(
      `http://localhost:5050/api/admin/users/${id}`,
      {
        method: "PUT",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      }
    );

    const data = await res.json();
    setSaving(false);

    if (data.success) {
      router.push(`/admin/users/${id}`);
    } else {
      alert("Update failed");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-gray-600 text-lg">Loading user...</div>
      </div>
    );
  }

 return (
  <div className="min-h-screen bg-gray-50 px-6 pt-6 pb-16">
    <div className="max-w-6xl mx-auto space-y-8">

      {/* HEADER */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            Edit User
          </h1>
          <p className="text-gray-500 mt-1">
            Update profile information and permissions
          </p>
        </div>

        <button
          onClick={() => router.push(`/admin/users/${id}`)}
          className="px-5 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-100 transition"
        >
          Cancel
        </button>
      </div>

      {/* EDIT CARD */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">

        <div className="flex items-start gap-10">

          {/* PROFILE IMAGE */}
          <div className="space-y-4">
            <div className="w-28 h-28 rounded-full overflow-hidden ring-4 ring-white shadow-lg">
              <img
                src={preview || "/user-placeholder.png"}
                className="w-full h-full object-cover"
              />
            </div>

            <label className="block text-sm text-center cursor-pointer text-gray-600 hover:text-black">
              Change Photo
              <input
                type="file"
                hidden
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    setImageFile(file);
                    setPreview(URL.createObjectURL(file));
                  }
                }}
              />
            </label>
          </div>

          {/* FORM FIELDS */}
          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6">

            <div className="md:col-span-2">
              <label className="text-sm text-gray-400 uppercase tracking-wide">
                Name
              </label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-2 w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-black outline-none"
              />
            </div>

            <div>
              <label className="text-sm text-gray-400 uppercase tracking-wide">
                Email
              </label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-2 w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-black outline-none"
              />
            </div>

            <div>
              <label className="text-sm text-gray-400 uppercase tracking-wide">
                Role
              </label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="mt-2 w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-black outline-none"
              >
                <option value="admin">Admin</option>
                <option value="user">User</option>
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="text-sm text-gray-400 uppercase tracking-wide">
                New Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Leave empty to keep current password"
                className="mt-2 w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-black outline-none"
              />
            </div>

          </div>

        </div>

        {/* ACTION BUTTON */}
        <div className="mt-10 flex justify-end">
          <button
            onClick={handleSave}
            disabled={saving}
            className="px-8 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition disabled:opacity-50"
          >
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>

      </div>

    </div>
  </div>
);
}