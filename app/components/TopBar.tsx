"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import TryOnViewer from "./TryOnViewer";

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
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    router.push("/?auth=login");
  };

  return (
    <>
      <header className="w-full bg-white shadow-sm sticky top-0 z-50">
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

            {/* PROFILE */}
            <Link
  href="/dashboard/profile"
  className="flex flex-col items-center hover:text-pink-500 transition"
>
  <span className="text-xl">👤</span>
  <span>Profile</span>
</Link>

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