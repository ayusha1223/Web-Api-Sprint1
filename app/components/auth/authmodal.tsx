"use client";

import { useEffect } from "react";
import LoginForm from "@/app/components/auth/LoginForm";
import RegisterForm from "@/app/components/auth/RegisterForm";
import ForgotPasswordForm from "@/app/components/auth/ForgotPasswordForm";
import styles from "./AuthModal.module.css";

type Mode = "login" | "register" | "forgot-password";

export default function AuthModal({
  open,
  mode,
  onClose,
  onSwitchMode,
}: {
  open: boolean;
  mode: Mode;
  onClose: () => void;
  onSwitchMode: (m: Mode) => void;
}) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (open) window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button
          className={styles.close}
          onClick={onClose}
          aria-label="Close"
        >
          ×
        </button>

        <div className={styles.grid}>
          {/* LEFT SIDE */}
          <div className={styles.left}>
            <div className={styles.brand}>
              NAAYU<span>Attire</span>
            </div>

            <div className={styles.illustrationWrap}>
              <img src="/images/login.png" alt="Auth" />
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className={styles.right}>
            <div className={styles.curveBg} />

            <div className={styles.rightInner}>
              {/* TITLE */}
              <h2 className={styles.title}>
                {mode === "login" && "Login"}
                {mode === "register" && "Create Account"}
                {mode === "forgot-password" && "Forgot Password"}
              </h2>

              {/* FORMS */}
              {mode === "login" && (
  <LoginForm
    onSuccess={() => {
      onClose(); // close modal after login
    }}
    onForgot={() => {
      onSwitchMode("forgot-password");
    }}
  />
)}

{mode === "register" && (
  <RegisterForm
    onSuccess={() => {
      onSwitchMode("login"); // back to login
    }}
  />
)}

{mode === "forgot-password" && (
  <ForgotPasswordForm
    onSuccess={() => {
      onSwitchMode("login"); // back to login after email sent
    }}
  />
)}


              {/* FOOTER LINKS */}
              <p className={styles.switchText}>
                {mode === "login" && (
                  <>
                    Don&apos;t have an account?{" "}
                    <button
                      type="button"
                      className={styles.switchLink}
                      onClick={() => onSwitchMode("register")}
                    >
                      Sign Up
                    </button>
                  </>
                )}

                {mode === "register" && (
                  <>
                    Already have an account?{" "}
                    <button
                      type="button"
                      className={styles.switchLink}
                      onClick={() => onSwitchMode("login")}
                    >
                      Login
                    </button>
                  </>
                )}

                {mode === "forgot-password" && (
                  <button
                    type="button"
                    className={styles.switchLink}
                    onClick={() => onSwitchMode("login")}
                  >
                    Back to Login
                  </button>
                )}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
