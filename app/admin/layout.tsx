"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { getAuthUser } from "@/app/lib/auth";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  useEffect(() => {
    const user = getAuthUser();
    if (!user || user.role !== "admin") {
      router.push("/login");
    }
  }, []);

  return <>{children}</>;
}
