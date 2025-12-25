import Image from "next/image";
import LoginForm from "../components/auth/LoginForm";


export default function LoginPage() {
  return (
    <div className="auth-container">
      <div className="auth-card">
        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: "15px" }}>
          <Image
            src="/images/login.png"
            alt="Naayu Attires Logo"
            width={80}
            height={80}
          />
        </div>

        <h1>Login</h1>
        <LoginForm />
      </div>
    </div>
  );
}
