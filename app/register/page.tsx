
import Link from "next/link";
import RegisterForm from "../components/auth/RegisterForm";

export default function RegisterPage() {
  return (
    <div className="auth-container">
      <div className="auth-card">

        {/* LEFT SIDE */}
        <div className="auth-left">
          <h1>Create Account</h1>
          <p>Please fill the details to register</p>

          <RegisterForm />

          {/* LOGIN LINK */}
          <p
            className="center-text"
            style={{
              marginTop: "15px",
              fontSize: "13px",
            }}
          >
            Already have an account?{" "}
            <Link href="/login">
              <span style={{ fontWeight: "600", cursor: "pointer" }}>
                Login
              </span>
            </Link>
          </p>
        </div>

        {/* RIGHT SIDE */}
        <div className="auth-right">
          <img src="/images/login.png" alt="Register Illustration" />
        </div>

      </div>
    </div>
  );
}
