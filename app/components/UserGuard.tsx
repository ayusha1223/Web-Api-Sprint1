"use client";

import { useEffect } from "react";
import type { ReactNode } from "react";
import { useRouter } from "next/navigation";
import { getAuth } from "../lib/auth";


export default function UserGuard({
  children,
}: {
  children: ReactNode;
}) {
  const router = useRouter();

  useEffect(() => {
    const auth = getAuth();

    if (!auth) {
      router.push("/login");
    }
  }, [router]);

  return <>{children}</>;
}
