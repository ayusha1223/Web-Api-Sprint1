import Image from "next/image";
import RegisterForm from "../components/auth/RegisterForm";

export default function RegisterPage() {
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

        <h1>Register</h1>
        <RegisterForm />
      </div>
    </div>
  );
}
