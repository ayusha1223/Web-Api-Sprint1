"use client";

import axios from "@/app/lib/api/axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type User = {
  _id: string;
  name: string;
  email: string;
  role: string;
  image?: string;
};

export default function ProfilePage() {
  const router = useRouter();

  const [user, setUser] = useState<User | null>(null);
  const [name, setName] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initProfile = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        router.replace("/login");
        return;
      }

      try {
        const res = await axios.get("/api/auth/whoami", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const userData = res.data.data;
        setUser(userData);
        setName(userData.name);

        if (userData.image) {
          setPreview(`http://localhost:5050${userData.image}`);
        }
      } catch {
        router.replace("/login");
      } finally {
        setLoading(false);
      }
    };

    initProfile();
  }, [router]);

  const submitHandler = async () => {
    if (!user) return;

    const token = localStorage.getItem("token");
    if (!token) return;

    const formData = new FormData();
    formData.append("name", name);
    if (image) formData.append("image", image);

    const res = await axios.put(
  `/api/auth/${user._id}`,
  formData,
  { headers: { Authorization: `Bearer ${token}` } }
);


    const updatedUser = res.data.data;
    setUser(updatedUser);
    setName(updatedUser.name);

    if (updatedUser.image) {
      setPreview(`http://localhost:5050${updatedUser.image}`);
    }

    alert("Profile updated");
  };

  if (loading) return <p>Loading...</p>;
  if (!user) return null;

  return (
  <div style={styles.page}>
    <div style={styles.card}>
      <h2 style={styles.title}>User Profile</h2>

      {/* Avatar */}
      <div style={styles.avatarWrapper}>
  <img
    src={preview || "/images/user-placeholder.png"}
    alt="Profile"
    style={styles.avatarImage}
  />
</div>


      {/* Info */}
      <div style={styles.info}>
        <p><span>Email:</span> {user.email}</p>
        <p><span>Role:</span> {user.role}</p>
      </div>

      {/* Name */}
      <div style={styles.field}>
        <label>Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      {/* Image Upload */}
      <div style={styles.field}>
        <label>Profile Image</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) =>
            setImage(e.target.files?.[0] || null)
          }
        />
      </div>

      {/* Button */}
      <button style={styles.button} onClick={submitHandler}>
        Update Profile
      </button>
    </div>
  </div>
);
}

const styles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: "100vh",
    background: "#f3f4f6",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  card: {
    width: "380px",
    background: "#ffffff",
    padding: "30px",
    borderRadius: "12px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
  },

  title: {
    textAlign: "center",
    marginBottom: "20px",
    fontSize: "22px",
    fontWeight: 600,
  },

  avatarWrapper: {
  width: "100px",
  height: "100px",
  borderRadius: "50%",
  border: "3px solid #2563eb",
  overflow: "hidden",          // 🔑 VERY IMPORTANT
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  margin: "0 auto 15px auto",
  background: "#f3f4f6",
},

avatarImage: {
  width: "100%",
  height: "100%",
  objectFit: "cover",          // 🔑 VERY IMPORTANT
},


  avatar: {
    width: "90px",
    height: "90px",
    borderRadius: "50%",
    objectFit: "cover",
    border: "3px solid #2563eb",
  },

  info: {
    fontSize: "14px",
    marginBottom: "15px",
  },

  field: {
    display: "flex",
    flexDirection: "column",
    marginBottom: "12px",
    fontSize: "14px",
  },

  button: {
    width: "100%",
    marginTop: "15px",
    padding: "10px",
    background: "#2563eb",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    fontWeight: 600,
    cursor: "pointer",
  },
};
