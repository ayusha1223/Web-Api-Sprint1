"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function SettingsPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  /* LOAD PROFILE */
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    fetch("http://localhost:5050/api/auth/whoami", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((res) => {
  console.log("USER OBJECT:", res.data.user);
  const user = res.data.user;
        setName(user.name || "");
        setEmail(user.email || "");
        if (user.image) {
          setPreview(`http://localhost:5050${user.image}`);
        }
      });
  }, []);

  /* SAVE PROFILE */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const token = localStorage.getItem("token");
    if (!token) return;

    const formData = new FormData();
    formData.append("name", name);
    if (password) formData.append("newPassword", password);
    if (image) formData.append("image", image);

    try {
      const res = await fetch(
        "http://localhost:5050/api/admin/profile",
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      const data = await res.json();

      if (data.success) {
        toast("Profile updated successfully");
      } else {
        toast(data.message || "Update failed");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 px-10 py-14">
      <div className="max-w-5xl mx-auto">

        {/* HEADER */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-800">
            Account Settings
          </h1>
          <p className="text-gray-500 mt-2">
            Manage your profile and security settings
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-16">

          {/* PROFILE SECTION */}
          <div className="flex items-center gap-12">

            {/* PROFILE IMAGE */}
            <div className="relative">
              <div className="w-32 h-32 rounded-full overflow-hidden shadow-xl ring-4 ring-white">
                <img
                  src={preview || "/user-placeholder.png"}
                  className="w-full h-full object-cover"
                />
              </div>

              <label className="absolute bottom-0 right-0 bg-black text-white text-xs px-3 py-1 rounded-full cursor-pointer hover:bg-gray-800 transition">
                Change
                <input
                  type="file"
                  hidden
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0] || null;
                    setImage(file);
                    if (file) {
                      setPreview(URL.createObjectURL(file));
                    }
                  }}
                />
              </label>
            </div>

            {/* NAME & EMAIL */}
            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-8">

              <div>
                <label className="text-sm text-gray-400 uppercase tracking-wide">
                  Full Name
                </label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mt-2 w-full border-b border-gray-300 focus:border-black outline-none py-2 text-lg"
                />
              </div>

              <div>
                <label className="text-sm text-gray-400 uppercase tracking-wide">
                  Email
                </label>
                <input
                  value={email}
                  disabled
                  className="mt-2 w-full border-b border-gray-200 py-2 text-lg text-gray-500"
                />
              </div>

            </div>
          </div>

          {/* PASSWORD SECTION */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">
              Change Password
            </h2>

            <div className="max-w-xl">
              <label className="text-sm text-gray-400 uppercase tracking-wide">
                New Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Create new password"
                className="mt-2 w-full border-b border-gray-300 focus:border-black outline-none py-2 text-lg"
              />
            </div>
          </div>

          {/* SAVE BUTTON */}
          <div>
            <button
              type="submit"
              disabled={loading}
              className="px-10 py-4 bg-black text-white rounded-full text-sm tracking-wide hover:bg-gray-800 transition disabled:opacity-50"
            >
              {loading ? "Saving Changes..." : "Save Changes"}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}