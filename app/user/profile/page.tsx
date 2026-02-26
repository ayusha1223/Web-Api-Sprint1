"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  getProfileAction,
  updateProfileAction,
} from "../../lib/actions/auth.action";

export default function ProfilePage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState("");
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const [updating, setUpdating] = useState(false); // 🔥 loading state

  /* ================= LOAD PROFILE ================= */
  useEffect(() => {
    async function loadProfile() {
      try {
        const user = await getProfileAction();
        setName(user.name || "");
        setEmail(user.email || "");
        setPhone(user.phone || "");

       if (user.imageUrl) {
  setImagePreview(`http://localhost:5050${user.imageUrl}`);
}
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadProfile();
  }, []);
  

  if (loading) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <p className="text-gray-500 text-lg animate-pulse">
        Loading profile...
      </p>
    </div>
  );
}
return (
  <div className="min-h-screen bg-[#f8f6f8] flex">

    {/* SIDEBAR */}
<div className="w-72 bg-white shadow-sm p-8">

  {/* BACK TO DASHBOARD */}
  <button
  onClick={() => router.push("/dashboard")}
  className="group flex items-center gap-2 px-5 py-2 rounded-full bg-white shadow-md border border-gray-200 hover:shadow-lg hover:border-pink-300 transition-all duration-300 mb-10"
>
  <span className="text-lg transition-transform duration-300 group-hover:-translate-x-1 text-gray-600">
    ←
  </span>
  <span className="text-sm font-semibold text-gray-700 group-hover:text-pink-500 transition">
    Back to Dashboard
  </span>
</button>

  <h2 className="text-2xl font-bold text-gray-800 mb-10 tracking-wide">
    My Account
  </h2>

  <nav className="space-y-3 text-sm font-medium">

    <div className="px-4 py-3 rounded-xl bg-pink-50 text-pink-600 font-semibold">
      Profile
    </div>

    <button
      onClick={() => router.push("/my-orders")}
      className="w-full text-left px-4 py-3 rounded-xl hover:bg-gray-100 transition"
    >
      My Orders
    </button>

    <button
      onClick={() => {
        localStorage.removeItem("token");
        router.push("/");
      }}
      className="w-full text-left px-4 py-3 rounded-xl text-red-500 hover:bg-red-50 transition"
    >
      Logout
    </button>
  </nav>
</div>

    {/* MAIN CONTENT */}
    <div className="flex-1 p-14">


      {/* TITLE */}
      <h1 className="text-3xl font-bold text-gray-900 mb-12">
        Profile
      </h1>

      {/* Avatar */}
      <div className="flex items-center gap-8 mb-12">

        <div className="relative w-28 h-28">
  {imagePreview ? (
    <img
      src={imagePreview}
      className="w-28 h-28 rounded-full object-cover border-4 border-pink-100"
    />
  ) : (
    <div className="w-28 h-28 rounded-full bg-pink-100 flex items-center justify-center text-3xl font-bold text-pink-500 border-4 border-pink-100">
      {name ? name.charAt(0).toUpperCase() : "U"}
    </div>
  )}
</div>

        <label className="cursor-pointer text-sm font-semibold text-pink-500 hover:text-pink-600 transition">
          Change Photo
          <input
            type="file"
            hidden
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                setImage(file);
                setImagePreview(URL.createObjectURL(file));
              }
            }}
          />
        </label>

      </div>

      {/* FORM */}
     <form
  className="space-y-8 max-w-2xl"
 onSubmit={async (e) => {
  e.preventDefault();

  console.log("Submitting:", { name, phone, newPassword, image });

  try {
    setUpdating(true);

    const result = await updateProfileAction({
      name,
      phone,
      newPassword: newPassword || undefined,
      image,
    });

    console.log("Server Response:", result);

    setUpdating(false);
  } catch (err) {
    console.error("Update failed:", err);
    setUpdating(false);
  }
}}
>
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-2">
            Full Name
          </label>
          <input
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-pink-400 focus:outline-none transition"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-2">
            Email
          </label>
          <input
            disabled
            className="w-full border border-gray-200 bg-gray-100 rounded-lg px-4 py-3 text-gray-500"
            value={email}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-2">
            Phone Number
          </label>
          <input
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-pink-400 focus:outline-none transition"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>

        <div className="pt-8 border-t border-gray-200">
          <label className="block text-sm font-medium text-gray-600 mb-2">
            New Password
          </label>
          <input
            type="password"
            placeholder="Enter new password"
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-pink-400 focus:outline-none transition"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </div>

        <button
          type="submit"
          className="mt-6 bg-gradient-to-r from-pink-500 to-pink-600 text-white font-semibold px-8 py-3 rounded-lg hover:scale-[1.02] transition"
        >
          Save Changes
        </button>

      </form>

    </div>

  </div>
);
}