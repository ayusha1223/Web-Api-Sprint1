"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/app/schemas/loginSchema";
import { useRouter } from "next/navigation";
import { loginAction } from "@/app/lib/actions/auth.action"; 

export default function LoginForm() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

 const onSubmit = async (data: any) => {
  try {
    const result = await loginAction(data);

    const { token, user } = result;

    // ✅ STORE AUTH DATA (THIS IS THE FIX)
    localStorage.setItem("token", token);
    localStorage.setItem("role", user.role);
    localStorage.setItem("userId", user._id);
    localStorage.setItem("user", JSON.stringify(user));

    // ✅ redirect based on role
    if (user.role === "admin") {
      router.push("/admin/users");
    } else {
      router.push("/user/profile");
    }
  } catch (error: any) {
    alert("Login failed");
  }
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