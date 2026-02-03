"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/app/schemas/loginSchema";
import { useRouter } from "next/navigation";
import { loginAction } from "@/app/lib/actions/auth.action";

export default function LoginForm({
  onSuccess,
  onForgot,
}: {
  onSuccess?: () => void;
  onForgot?: () => void;
}) {



  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: any) => {
  try {
    const result = await loginAction(data);
    const { token, user } = result;

    localStorage.setItem("token", token);
    localStorage.setItem("role", user.role);
    localStorage.setItem("userId", user._id);
    localStorage.setItem("user", JSON.stringify(user));

    onSuccess?.(); // ✅ CLOSE MODAL FIRST (THIS WAS MISSING)

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
    <form onSubmit={handleSubmit(onSubmit)} className="authForm">
      {/* Email */}
      <div className="authField">
        <input
          className={`authInput ${errors.email ? "authInputError" : ""}`}
          placeholder="Email *"
          autoComplete="email"
          {...register("email")}
        />
        {errors.email && (
          <p className="authError">{errors.email.message as string}</p>
        )}
      </div>

      {/* Password */}
      <div className="authField">
        <div className="authPasswordWrap">
          <input
            type={showPassword ? "text" : "password"}
            className={`authInput authPasswordInput ${
              errors.password ? "authInputError" : ""
            }`}
            placeholder="Password *"
            autoComplete="current-password"
            {...register("password")}
          />

          <button
  type="button"
  className="authEyeBtn"
  onClick={() => setShowPassword((s) => !s)}
  aria-label={showPassword ? "Hide password" : "Show password"}
>
  {showPassword ? (
    // Eye Off
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M3 3l18 18"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M10.6 10.6a3 3 0 004.24 4.24"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M9.88 5.08A10.94 10.94 0 0112 5c5 0 9.27 3.11 11 7-0.58 1.3-1.45 2.49-2.53 3.47"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M6.53 6.53C4.44 7.8 2.84 9.68 2 12c1.73 3.89 6 7 10 7 1.24 0 2.43-.2 3.53-.57"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  ) : (
    // Eye On
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z"
        stroke="currentColor"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle
        cx="12"
        cy="12"
        r="3"
        stroke="currentColor"
        strokeWidth="2"
        fill="none"
      />
    </svg>
  )}
</button>

        </div>

        {errors.password && (
          <p className="authError">{errors.password.message as string}</p>
        )}
      </div>

      {/* Forgot password */}
<button
  type="button"
  className="authForgotLink"
  onClick={() => onForgot?.()}
>
  Forgot Password
</button>




      {/* Login button */}
      <button className="authSubmitBtn" type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Signing in..." : "LOGIN"}
      </button>
    </form>
  );
}
