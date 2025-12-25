import LoginForm from "../components/auth/LoginForm";


export default function LoginPage() {
  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1>Login</h1>
        <LoginForm />
      </div>
    </div>
  );
}
