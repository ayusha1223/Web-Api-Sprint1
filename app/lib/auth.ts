export function getAuth() {
  if (typeof window === "undefined") return null;

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  if (!token) return null;

  return { token, role };
}
