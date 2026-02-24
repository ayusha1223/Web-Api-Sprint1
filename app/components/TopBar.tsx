"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface TopBarProps {
  showTryOn?: boolean;
  onTryOnClick?: () => void;
}

interface User {
  id: string;
  email: string;
  role: string;
  name?: string;
  image?: string;
}

export default function TopBar({ showTryOn = true, onTryOnClick }: TopBarProps) {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showSettingsMenu, setShowSettingsMenu] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    smsNotifications: false,
    saleAlerts: true,
    orderUpdates: true,
    promotionalOffers: false,
  });

  /* =========================================
     FETCH REAL USER FROM BACKEND
  ========================================= */
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const res = await fetch("http://localhost:5050/api/auth/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) throw new Error("Failed to fetch user");

        const data = await res.json();
        setUser(data);
      } catch (error) {
        console.error("User fetch failed:", error);
      }
    };

    fetchUser();
  }, []);

  /* =========================================
     LOGOUT
  ========================================= */
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setShowProfileMenu(false);
    setShowSettingsMenu(false);
    router.push("/?auth=login");
  };

  /* =========================================
     DARK MODE
  ========================================= */
  const toggleDarkMode = () => {
    document.body.classList.toggle("dark");
    const isDark = document.body.classList.contains("dark");
    setDarkMode(isDark);
    localStorage.setItem("theme", isDark ? "dark" : "light");
  };

  return (
    <div className="topBar">
      <div className="topSearch">
        <div className="searchWrapper">
          <span className="searchIcon">🔍</span>
          <input
            type="text"
            placeholder="Search for dresses, co-ord sets, party wear..."
            className="searchInput"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <span className="filterIcon">⚙️</span>
        </div>
      </div>

      <div className="topRight">
        {showTryOn && (
          <span
            className="icon"
            onClick={onTryOnClick}
            title="Try On"
            style={{ cursor: "pointer" }}
          >
            👗
          </span>
        )}

        <Link href="/favorites" className="icon">♡</Link>
        <Link href="/cart" className="icon">🛒</Link>

        <div className="profileWrapper">
          <span
            className="icon"
            onClick={() => {
              setShowProfileMenu(!showProfileMenu);
              setShowSettingsMenu(false);
            }}
          >
            👤
          </span>

          {showProfileMenu && (
            <div className="profileDropdown">

              {showSettingsMenu ? (
                <>
                  <button
                    className="menuItem"
                    onClick={() => setShowSettingsMenu(false)}
                  >
                    ← <span>Back</span>
                  </button>

                  <div className="menuDivider" />

                  {Object.keys(notifications).map((key) => (
                    <label key={key} className="toggleRow">
                      <span>{key}</span>
                      <input
                        type="checkbox"
                        checked={
                          notifications[key as keyof typeof notifications]
                        }
                        onChange={(e) =>
                          setNotifications({
                            ...notifications,
                            [key]: e.target.checked,
                          })
                        }
                      />
                    </label>
                  ))}
                </>
              ) : (
                <>
                  {/* ================= PROFILE HEADER ================= */}
                  <div className="profileHeader">
                    <div className="profileAvatar">
                      {user?.image ? (
                        <img
  src={`http://localhost:5050${user.image}`}
  alt="Profile"
  className="avatarImage"
/>
                      ) : (
                        <span>
                          {(user?.name || user?.email)
                            ?.charAt(0)
                            .toUpperCase()}
                        </span>
                      )}
                    </div>

                    <div>
                      <div className="profileName">
                        {user?.name ||
                          user?.email?.split("@")[0] ||
                          "User"}
                      </div>

                      <div className="profileEmail">
                        {user?.email || ""}
                      </div>
                    </div>
                  </div>

                  <Link
                    href="/user/profile"
                    className="menuItem"
                    onClick={() => setShowProfileMenu(false)}
                  >
                    ✏️ <span>Edit Profile</span>
                  </Link>

                  <button
                    className="menuItem"
                    onClick={() => setShowSettingsMenu(true)}
                  >
                    ⚙️ <span>Settings</span>
                  </button>

                  <Link
                    href="/my-orders"
                    className="menuItem"
                    onClick={() => setShowProfileMenu(false)}
                  >
                    📦 <span>My Orders</span>
                  </Link>

                  <button className="menuItem" onClick={toggleDarkMode}>
                    🌙 <span>{darkMode ? "Light Mode" : "Dark Mode"}</span>
                  </button>

                  <div className="menuDivider" />

                  <button
                    className="menuItem logout"
                    onClick={handleLogout}
                  >
                    🚪 <span>Logout</span>
                  </button>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}