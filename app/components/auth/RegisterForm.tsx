"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "@/app/schemas/registerSchema";
import { registerAction } from "@/app/lib/actions/auth.action";

export default function RegisterForm({
  onSuccess,
}: {
  onSuccess?: () => void;
}) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: any) => {
    try {
      // ❗ Remove confirmPassword before sending to backend
      const { confirmPassword, ...payload } = data;

      await registerAction(payload);
      alert("Registration successful");
      onSuccess?.(); // switch to login
    } catch (error: any) {
      alert(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="authForm">
      {/* Full Name */}
      <div className="authField">
        <input
          className={`authInput ${errors.name ? "authInputError" : ""}`}
          placeholder="Full Name *"
          {...register("name")}
        />
        {errors.name && (
          <p className="authError">{errors.name.message as string}</p>
        )}
      </div>

      {/* Email */}
      <div className="authField">
        <input
          className={`authInput ${errors.email ? "authInputError" : ""}`}
          placeholder="Email *"
          {...register("email")}
        />
        {errors.email && (
          <p className="authError">{errors.email.message as string}</p>
        )}
      </div>

      {/* Phone */}
      <div className="authField">
        <input
          className={`authInput ${errors.phone ? "authInputError" : ""}`}
          placeholder="Mobile Number *"
          {...register("phone")}
        />
        {errors.phone && (
          <p className="authError">{errors.phone.message as string}</p>
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
            {...register("password")}
          />
          <button
            type="button"
            className="authEyeBtn"
            onClick={() => setShowPassword((s) => !s)}
          >
            👁️
          </button>
        </div>
        {errors.password && (
          <p className="authError">{errors.password.message as string}</p>
        )}
      </div>

      {/* Confirm Password */}
      <div className="authField">
        <div className="authPasswordWrap">
          <input
            type={showConfirmPassword ? "text" : "password"}
            className={`authInput authPasswordInput ${
              errors.confirmPassword ? "authInputError" : ""
            }`}
            placeholder="Confirm Password *"
            {...register("confirmPassword")}
          />
          <button
            type="button"
            className="authEyeBtn"
            onClick={() => setShowConfirmPassword((s) => !s)}
          >
            👁️
          </button>
        </div>
        {errors.confirmPassword && (
          <p className="authError">
            {errors.confirmPassword.message as string}
          </p>
        )}
      </div>

      <button
        className="authSubmitBtn"
        type="submit"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Creating Account..." : "Create Account"}
      </button>
    </form>
  );
}
