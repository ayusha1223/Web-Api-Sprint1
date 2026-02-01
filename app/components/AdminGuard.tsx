"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminGuard({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (!token) {
      router.replace("/login");
      return;
    }

    if (role !== "admin") {
      router.replace("/dashboard");
      return;
    }

    // ✅ Passed all checks
    setChecked(true);
  }, [router]);

  // ⛔ Don't render until check is done
  if (!checked) return null;

  return <>{children}</>;
}
