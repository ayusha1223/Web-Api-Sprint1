"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const schema = z.object({
  email: z.string().email("Enter a valid email"),
});

export default function ForgotPasswordForm({
  onSuccess,
}: {
  onSuccess?: () => void;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: any) => {
    try {
      // 🔹 connect backend later
      console.log("Forgot password:", data.email);

      alert("Reset link sent to your email");

      onSuccess?.(); // ✅ THIS LINE FIXES THE ERROR
    } catch {
      alert("Something went wrong");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="authForm">
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

      <button className="authSubmitBtn" type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Sending..." : "Send Reset Link"}
      </button>
    </form>
  );
}