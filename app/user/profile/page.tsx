"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./profile.module.css";
import {
  getProfileAction,
  updateProfileAction,
} from "../../lib/actions/auth.action";

export default function ProfilePage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState("");
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const [updating, setUpdating] = useState(false); // 🔥 loading state

  /* ================= LOAD PROFILE ================= */
  useEffect(() => {
    async function loadProfile() {
      try {
        const user = await getProfileAction();
        setName(user.name || "");
        setEmail(user.email || "");
        setPhone(user.phone || "");

        if (user.image) {
          setImagePreview(`http://localhost:5050${user.image}`);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadProfile();
  }, []);

  if (loading) {
    return <p className={styles.loading}>Loading profile…</p>;
  }

  return (
    <div className={styles.profilePage}>
      <div className={styles.profileCard}>

        <button
          type="button"
          className={styles.backBtn}
          onClick={() => router.back()}
        >
          ← Back
        </button>

        <h2>Account Settings</h2>
        <p className={styles.subtitle}>Update your profile details</p>

        {/* AVATAR */}
        <div className={styles.avatarSection}>
          <img
            src={imagePreview || "/images/avatar.jpg"}
            alt="Profile"
            className={styles.avatar}
          />

          <label className={styles.uploadBtn}>
            Change Photo
            <input
              type="file"
              hidden
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  setImage(file);
                  setImagePreview(URL.createObjectURL(file));
                }
              }}
            />
          </label>
        </div>

        {/* FORM */}
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            try {
              setUpdating(true);

              await updateProfileAction({
                name,
                phone,
                newPassword: newPassword || undefined,
                image,
              });

              setSuccess(true);

              setTimeout(() => {
                router.push("/dashboard");
              }, 2500);

            } catch (err: any) {
              alert(err.message);
              setUpdating(false);
            }
          }}
        >
          <div className={styles.formGroup}>
            <label>Full Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className={styles.formGroup}>
            <label>Email</label>
            <input type="email" value={email} disabled />
          </div>

          <div className={styles.formGroup}>
            <label>Phone Number</label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>

          <div className={styles.divider}>Change Password</div>

          <div className={styles.formGroup}>
            <label>New Password</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>

          {/* SUCCESS MESSAGE */}
          {success && (
            <div className={styles.successMsg}>
              ✅ Profile updated successfully! Redirecting...
            </div>
          )}

          <button
            type="submit"
            className={styles.saveBtn}
            disabled={updating}
          >
            {updating ? (
              <span className={styles.spinner}></span>
            ) : (
              "Save Changes"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}