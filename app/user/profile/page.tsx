"use client";

import { useState } from "react";
import styles from "./profile.module.css";

export default function ProfilePage() {
  const [success, setSuccess] = useState(false);

  return (
    <div className={styles.profilePage}>
      <div className={styles.profileCard}>
        <h2>Account Settings</h2>
        <p className={styles.subtitle}>Update your profile details</p>

        {/* Profile Image */}
        <div className={styles.avatarSection}>
          <img
            src="/images/avatar.jpg"
            alt="Profile"
            className={styles.avatar}
          />
          <label className={styles.uploadBtn}>
            Change Photo
            <input type="file" hidden />
          </label>
        </div>

        {/* FORM */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setSuccess(true);
            setTimeout(() => setSuccess(false), 3000);
          }}
        >
          {/* NAME */}
          <div className={styles.formGroup}>
            <label>Full Name</label>
            <input type="text" placeholder="Enter your name" />
          </div>

          {/* EMAIL (READ ONLY) */}
          <div className={styles.formGroup}>
            <label>Email</label>
            <input
              type="email"
              value="durga@gmail.com"
              disabled
            />
          </div>

          {/* PHONE */}
          <div className={styles.formGroup}>
            <label>Phone Number</label>
            <input type="tel" placeholder="+61 4XXXXXXXX" />
          </div>

          {/* DIVIDER */}
          <div className={styles.divider}>Change Password</div>

          {/* CURRENT PASSWORD */}
          <div className={styles.formGroup}>
            <label>Current Password</label>
            <input type="password" />
          </div>

          {/* NEW PASSWORD */}
          <div className={styles.formGroup}>
            <label>New Password</label>
            <input type="password" />
          </div>

          {/* CONFIRM PASSWORD */}
          <div className={styles.formGroup}>
            <label>Confirm New Password</label>
            <input type="password" />
          </div>

          {/* SUCCESS */}
          {success && (
            <p className={styles.successMsg}>
              ✅ Profile updated successfully
            </p>
          )}

          <button type="submit" className={styles.saveBtn}>
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
}
