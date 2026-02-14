const API_URL = "http://localhost:5050/api/auth";

/* ---------------- REGISTER ---------------- */
export async function registerAction(data: {
  name: string;
  email: string;
  phone: string;
  password: string;
}) {
  const res = await fetch(`${API_URL}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  const result = await res.json();

  if (!res.ok) {
    throw new Error(result.message || "Registration failed");
  }

  return result;
}

/* ---------------- LOGIN ---------------- */
export async function loginAction(data: {
  email: string;
  password: string;
}) {
  const res = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  const result = await res.json();

  if (!res.ok) {
    throw new Error(result.message || "Login failed");
  }

  // ✅ SAVE TOKEN
  localStorage.setItem("token", result.token);

  // ✅ SAVE USER (MATCH BACKEND RESPONSE)
  localStorage.setItem(
    "user",
    JSON.stringify({
      id: result.user.id,     // ✅ correct
      email: result.user.email,
      role: result.user.role,
    })
  );

  return result;
}

/* ---------------- GET PROFILE ---------------- */
export async function getProfileAction() {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("Not authenticated");

  const res = await fetch(`${API_URL}/whoami`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const result = await res.json();

  if (!res.ok) throw new Error(result.message);

  // 🔥 FIX HERE
  return result.data.user;
}

/* ---------------- UPDATE PROFILE ---------------- */
export async function updateProfileAction(data: {
  name?: string;
  phone?: string;
  newPassword?: string;
  image?: File | null;
}) {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("Not authenticated");

  const formData = new FormData();

  if (data.name) formData.append("name", data.name);
  if (data.phone) formData.append("phone", data.phone);
  if (data.newPassword) formData.append("newPassword", data.newPassword);
  if (data.image) formData.append("image", data.image);

  const res = await fetch("http://localhost:5050/api/auth/update-profile", {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      // ❌ DO NOT set Content-Type
    },
    body: formData,
  });

  const result = await res.json();
  if (!res.ok) throw new Error(result.message);
  return result;
}

