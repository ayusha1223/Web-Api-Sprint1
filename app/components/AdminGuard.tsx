"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getAuth } from "../lib/auth";


export default function AdminGuard({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  useEffect(() => {
    const auth = getAuth();
    if (!auth || auth.role !== "admin") {
      router.push("/login");
    }
  }, []);

  return <>{children}</>;
}
