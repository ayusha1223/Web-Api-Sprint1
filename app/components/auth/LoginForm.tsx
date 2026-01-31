"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/app/schemas/loginSchema";
import { useRouter } from "next/navigation";

type LoginFormData = {
  email: string;
  password: string;
};

export default function LoginForm() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (formData: LoginFormData) => {
    console.log("LOGIN SUBMITTED", formData);
    try {
      const res = await fetch("http://localhost:5050/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message || "Login failed");
      }

      // ✅ SAVE LOGIN STATE (VERY IMPORTANT)
      localStorage.setItem("token", result.token);
      localStorage.setItem("user", JSON.stringify(result.user));

      // ✅ ROLE-BASED REDIRECT
      if (result.user.role === "admin") {
        router.push("/admin/users");
      } else {
        router.push("/user/profile");
      }

    } catch (error: any) {
      alert(error.message || "Something went wrong");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>Email</label>
      <input
        className="input"
        type="email"
        {...register("email")}
      />
      {errors.email && (
        <p className="error">{errors.email.message}</p>
      )}

      <label>Password</label>
      <input
        type="password"
        className="input"
        {...register("password")}
      />
      {errors.password && (
        <p className="error">{errors.password.message}</p>
      )}

      <div className="forgot">Forgot Password?</div>

      <button className="btn" type="submit">
        Login
      </button>
    </form>
  );
}
