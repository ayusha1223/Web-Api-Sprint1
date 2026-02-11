"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import "./admin.css";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const menu = [
    { name: "Dashboard", path: "/admin" },
    { name: "Products", path: "/admin/products" },
    { name: "Orders", path: "/admin/orders" },
    { name: "Users", path: "/admin/users" },
    { name: "Coupons", path: "/admin/coupons" },
    { name: "Inventory", path: "/admin/inventory" },
    { name: "Payments", path: "/admin/payments" },
    { name: "Reports", path: "/admin/reports" },
    { name: "Settings", path: "/admin/settings" },
  ];

  return (
    <div className="adminLayout">
      <aside className="adminSidebar">
        <h2>NAAYU ADMIN</h2>

        {menu.map((item) => (
          <Link
            key={item.name}
            href={item.path}
            className={
              pathname === item.path
                ? "adminLink active"
                : "adminLink"
            }
          >
            {item.name}
          </Link>
        ))}

        <div className="logoutBtn">Logout</div>
      </aside>

      <main className="adminContent">{children}</main>
    </div>
  );
}
