export async function registerAction(data: any) {
  const res = await fetch("http://localhost:5050/api/auth/register", {
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
export async function loginAction(data: any) {
  const res = await fetch("http://localhost:5050/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  const result = await res.json();

  if (!res.ok) {
    throw new Error(result.message || "Login failed");
  }

  // ✅ SAVE TOKEN (MOST IMPORTANT)
  // ✅ SAVE TOKEN
if (result.token) {
  localStorage.setItem("token", result.token);
}

// ✅ SAVE USER (IMPORTANT FOR PROFILE UPDATE)
if (result.user) {
  localStorage.setItem(
    "user",
    JSON.stringify({
      id: result.user._id,     // 👈 REQUIRED
      name: result.user.name,
      email: result.user.email,
      role: result.user.role,
      image: result.user.image,
    })
  );
}

  return result;
}

/* ---------------- UPDATE PROFILE ---------------- */
export async function updateProfileAction(data: {
  name?: string;
  image?: File | null;
}) {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("Not authenticated");
  }

  const formData = new FormData();

  if (data.name) formData.append("name", data.name);
  if (data.image) formData.append("image", data.image);

  const res = await fetch("http://localhost:5050/api/auth/update-profile", {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      // ❌ DO NOT set Content-Type for FormData
    },
    body: formData,
  });

  const result = await res.json();

  if (!res.ok) {
    throw new Error(result.message || "Failed to update profile");
  }

  return result;
}
