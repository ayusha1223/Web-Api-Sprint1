"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import TryOnViewer from "./TryOnViewer";
import { useTheme } from "../context/ThemeContext";
interface User {
  id: string;
  email: string;
  role: string;
  name?: string;
  image?: string;
}

export default function TopBar() {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [user, setUser] = useState<User | null>(null);
  const [showTryOn, setShowTryOn] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const [notifications, setNotifications] = useState<any[]>([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const categories = [
    { name: "Home", link: "/dashboard" },
    { name: "CASUAL", link: "/dashboard/category/casual" },
    { name: "CO-ORD", link: "/dashboard/category/coord" },
    { name: "PARTY", link: "/dashboard/category/party" },
    { name: "WINTER", link: "/dashboard/category/winter" },
    { name: "WEDDING", link: "/dashboard/category/wedding" },
    { name: "1 PIECE", link: "/dashboard/category/onepiece" },
  ];

const markAsRead = async (id: string) => {
  const token = localStorage.getItem("token");
  if (!token) return;

  try {
    await fetch(
      `http://localhost:5050/api/notifications/${id}/read`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    // Update UI instantly
    setNotifications((prev) =>
      prev.map((n) =>
        n._id === id ? { ...n, isRead: true } : n
      )
    );
  } catch (err) {
    console.log(err);
  }
};

const fetchNotifications = async () => {
  const token = localStorage.getItem("token");
  if (!token) return;

  try {
    const res = await fetch(
      "http://localhost:5050/api/notifications",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await res.json();
    setNotifications(data.data || []);
  } catch (err) {
    console.log(err);
  }
};

useEffect(() => {
  const fetchUser = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const res = await fetch("http://localhost:5050/api/auth/me", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json();
      setUser(data);
    } catch (err) {
      console.log(err);
    }
  };

  fetchUser();
  fetchNotifications(); // 🔥 CALL IT

  const interval = setInterval(() => {
    fetchNotifications(); // auto refresh every 10s
  }, 10000);

  return () => clearInterval(interval);
}, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    router.push("/?auth=login");
  };

  return (
    <>
      <header
  className="
    w-full
    bg-white dark:bg-[#111111]
    text-black dark:text-white
    border-b border-gray-200 dark:border-gray-700
    shadow-sm
    sticky top-0 z-50
    transition-colors duration-300
  "
>
        <div className="max-w-[1400px] mx-auto flex items-center justify-between px-8 py-4">

          {/* LEFT */}
          <div className="flex items-center gap-12">
            <Link href="/dashboard">
              <div className="text-4xl font-extrabold text-pink-500 hover:scale-110 transition cursor-pointer select-none">
                N
              </div>
            </Link>

            <nav className="hidden lg:flex items-center gap-10 text-sm font-bold tracking-wide">
              {categories.map((cat) => (
                <Link
                  key={cat.name}
                  href={cat.link}
                  className={`relative uppercase transition 
                  after:absolute after:left-0 after:-bottom-2 after:h-[3px] after:w-0 
                  after:bg-pink-500 after:transition-all after:duration-300
                  hover:text-pink-500 hover:after:w-full
                  ${
                    pathname === cat.link
                      ? "text-pink-500 after:w-full"
                      : "text-gray-800"
                  }`}
                >
                  {cat.name}
                </Link>
              ))}
            </nav>
          </div>

          {/* SEARCH */}
          <div className="flex-1 flex justify-center px-10">
            <div className="w-full max-w-xl">
              <div className="flex items-center gap-3 bg-gray-100 px-5 py-2 rounded-md">
                <span className="text-gray-500">🔍</span>
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-transparent outline-none w-full text-sm"
                />
              </div>
            </div>
          </div>

          {/* RIGHT ICONS */}
          <div className="flex items-center gap-10 text-sm font-medium">

            {/* TRY ON */}
            <div
              onClick={() => setShowTryOn(true)}
              className="flex flex-col items-center cursor-pointer hover:text-pink-500 transition"
            >
              <span className="text-xl">👗</span>
              <span>Try On</span>
            </div>
            {/* NOTIFICATION */}
<div className="relative">
  <div
    onClick={() => setShowNotifications(!showNotifications)}
    className="relative flex flex-col items-center cursor-pointer hover:text-pink-500 transition"
  >
    <span className="text-xl">🔔</span>
    <span>Alerts</span>

    {/* Unread Count Badge */}
    {notifications.filter((n) => !n.isRead).length > 0 && (
      <span className="absolute -top-1 -right-2 bg-red-500 text-white text-[10px] px-1.5 py-0.5 rounded-full font-bold shadow-md">
        {notifications.filter((n) => !n.isRead).length}
      </span>
    )}
  </div>

  {showNotifications && (
    <div className="absolute right-0 mt-4 w-96 bg-white dark:bg-[#1a1a1a] shadow-2xl rounded-2xl border border-gray-200 dark:border-gray-700 p-5 z-50 animate-fadeIn">

      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-gray-800 dark:text-white">
          Notifications
        </h3>
        <span className="text-xs text-gray-400">
          {notifications.length} total
        </span>
      </div>

      {/* Body */}
      {notifications.length === 0 ? (
        <div className="text-center py-10 text-gray-400">
          🎉 No new notifications
        </div>
      ) : (
        <div className="space-y-3 max-h-[350px] overflow-y-auto pr-2">
          {notifications.map((n) => (
            <div
              key={n._id}
              onClick={() => markAsRead(n._id)}
              className={`group relative p-4 rounded-xl cursor-pointer transition-all duration-300 border
                ${
                  n.isRead
                    ? "bg-gray-50 dark:bg-[#2a2a2a] border-gray-100 dark:border-gray-700"
                    : "bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900 dark:to-blue-800 border-blue-200 dark:border-blue-700 shadow-sm"
                }
                hover:scale-[1.02] hover:shadow-lg
              `}
            >
              <div className="flex items-start gap-3">
                <div className={`text-xl ${n.isRead ? "opacity-50" : ""}`}>
                  {n.message.includes("shipped") ? "🚚" : "📦"}
                </div>

                <div className="flex-1">
                  <p
                    className={`text-sm ${
                      n.isRead
                        ? "text-gray-600 dark:text-gray-400"
                        : "text-gray-800 dark:text-white font-semibold"
                    }`}
                  >
                    {n.message}
                  </p>

                  <p className="text-xs text-gray-400 mt-1">
                    {new Date(n.createdAt).toLocaleString()}
                  </p>
                </div>
              </div>

              {!n.isRead && (
                <span className="absolute top-3 right-3 w-2 h-2 bg-blue-500 rounded-full"></span>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )}
</div>
            {/* PROFILE DROPDOWN */}
<div className="relative">
  <div
    onClick={() => setShowProfileMenu(!showProfileMenu)}
    className="flex flex-col items-center cursor-pointer hover:text-pink-500 transition"
  >
    <span className="text-xl">👤</span>
    <span>Profile</span>
  </div>

  {showProfileMenu && (
    <div className="absolute right-0 mt-4 w-64 bg-white shadow-xl rounded-xl border p-4 z-50">

      {/* USER INFO */}
      {/* USER INFO WITH IMAGE */}
<div className="flex items-center gap-3 border-b pb-4 mb-4">

  {/* PROFILE IMAGE */}
  <div className="w-14 h-14 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center text-xl font-bold text-gray-500">
    {user?.image ? (
      <img
        src={`http://localhost:5050/${user.image}`}
        alt="Profile"
        className="w-full h-full object-cover"
      />
    ) : (
      user?.name?.charAt(0).toUpperCase() || "U"
    )}
  </div>

  {/* NAME & EMAIL */}
  <div>
    <p className="font-semibold text-gray-800">
      {user?.name || "User Name"}
    </p>
    <p className="text-sm text-gray-500">
      {user?.email || "user@email.com"}
    </p>
  </div>

</div>

      {/* MENU ITEMS */}
      <div className="flex flex-col text-sm font-medium text-gray-700">

  {/* Edit Profile */}
  <button
    onClick={() => {
      setShowProfileMenu(false);
      router.push("/user/profile");
    }}
    className="group flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 hover:bg-gray-100 hover:shadow-sm"
  >
    <span className="text-lg transition-transform duration-200 group-hover:scale-110">
      ✏️
    </span>
    <span className="group-hover:text-gray-900">
      Edit Profile
    </span>
  </button>

  {/* Theme */}
 <button
  onClick={toggleTheme}
  className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 
             hover:bg-gray-100 dark:hover:bg-gray-700 transition"
>
  {theme === "light" ? "🌙 Dark Mode" : "☀️ Light Mode"}
</button>

  {/* My Orders */}
  <button
    onClick={() => {
      setShowProfileMenu(false);
      router.push("/my-orders");
    }}
    className="group flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 hover:bg-gray-100 hover:shadow-sm"
  >
    <span className="text-lg transition-transform duration-200 group-hover:scale-110">
      📦
    </span>
    <span className="group-hover:text-gray-900">
      My Orders
    </span>
  </button>

  {/* Divider */}
  <div className="my-2 border-t border-gray-200"></div>

  {/* Logout */}
  <button
    onClick={handleLogout}
    className="group flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 hover:bg-red-50"
  >
    <span className="text-lg text-red-500 transition-transform duration-200 group-hover:scale-110">
      🚪
    </span>
    <span className="text-red-500 font-semibold">
      Logout
    </span>
  </button>

</div>
      </div>
  )}
</div>

            <Link
              href="/favorites"
              className="flex flex-col items-center hover:text-pink-500 transition"
            >
              <span className="text-xl">♡</span>
              <span>Wishlist</span>
            </Link>

            <Link
              href="/cart"
              className="flex flex-col items-center hover:text-pink-500 transition"
            >
              <span className="text-xl">🛍️</span>
              <span>Bag</span>
            </Link>
          </div>
        </div>
      </header>

      {/* TRY ON MODAL */}
      {showTryOn && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-[100]">

          <div className="bg-white rounded-xl w-[900px] h-[600px] relative p-6">

            <button
              onClick={() => setShowTryOn(false)}
              className="absolute top-4 right-4 text-gray-500 text-lg"
            >
              ✕
            </button>

            <TryOnViewer />
          </div>

        </div>
      )}
    </>
  );
}