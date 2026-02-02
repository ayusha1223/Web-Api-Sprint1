import Link from "next/link";
import LoginForm from "@/app/components/auth/LoginForm";

export default function LoginPage() {
  return (
    <div className="login-page">

      {/* TOP BANNER */}
      <div className="login-banner">
        <img src="/images/login-banner.jpg" alt="Login Banner" />
      </div>

      {/* LOGIN SECTION */}
      <div className="login-section">
        <div className="login-box">
          <h1>Login</h1>

          <LoginForm />

          <p className="center-text">
            Don&apos;t have an account?{" "}
            <Link href="/register">
              <span>Register With us</span>
            </Link>
          </p>
        </div>
      </div>

    </div>
  );
}
