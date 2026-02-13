"use client";

import Link from "next/link";
import { useState } from "react";

interface TopBarProps {
  showTryOn?: boolean;
  onTryOnClick?: () => void;
}

export default function TopBar({ showTryOn = true, onTryOnClick }: TopBarProps) {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

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
        <Link href="/favorites" className="icon">
          ♡
        </Link>
        <Link href="/cart" className="icon">
          🛒
        </Link>
        <div className="profileWrapper">
          <span
            className="icon"
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            style={{ cursor: "pointer" }}
          >
            👤
          </span>

          {showProfileMenu && (
            <div className="profileDropdown">
              <Link
                href="/user/profile"
                className="menuItem"
                onClick={() => setShowProfileMenu(false)}
              >
                ✏️ <span>Edit Profile</span>
              </Link>

              <button className="menuItem">
                ⚙️ <span>Settings</span>
              </button>

              <button className="menuItem" onClick={toggleDarkMode}>
                🌙 <span>{darkMode ? "Light Mode" : "Dark Mode"}</span>
              </button>

              <div className="menuDivider" />

              <button className="menuItem logout">
                🚪 <span>Logout</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}