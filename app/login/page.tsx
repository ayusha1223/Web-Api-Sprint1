import LoginForm from "@/app/components/auth/LoginForm";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="auth-container">
      <div className="auth-card">

        {/* LEFT SIDE */}
        <div className="auth-left">
          <h1>Welcome Back!!</h1>
          <p>Please login to your account</p>

          <LoginForm />

          {/* SIGN UP LINK */}
          <p className="center-text">
            Don&apos;t have an account?{" "}
            <Link href="/register">
              <span style={{ fontWeight: "600", cursor: "pointer" }}>
                Sign up
              </span>
            </Link>
          </p>
        </div>

        {/* RIGHT SIDE */}
        <div className="auth-right">
          <img src="/images/login.png" alt="Login Illustration" />
        </div>

      </div>
    </div>
  );
}
