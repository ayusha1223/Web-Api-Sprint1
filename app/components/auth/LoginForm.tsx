"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/app/schemas/loginSchema";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: any) => {
    console.log("Login Data:", data);

    // ✅ Navigate to dashboard after login
    router.push("/dashboard");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>Email</label>
      <input className="input" {...register("email")} />
      {errors.email && (
        <p className="error">{errors.email.message as string}</p>
      )}

      <label>Password</label>
      <input type="password" className="input" {...register("password")} />
      {errors.password && (
        <p className="error">{errors.password.message as string}</p>
      )}

      <div className="forgot">Forgot Password?</div>

      <button className="btn" type="submit">
        Login
      </button>
    </form>
  );
}
