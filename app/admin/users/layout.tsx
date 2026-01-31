"use client";

import UserGuard from "@/app/components/UserGuard";

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <UserGuard>{children}</UserGuard>;
}
