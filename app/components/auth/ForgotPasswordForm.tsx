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
    const res = await fetch(
      "http://localhost:5050/api/auth/forgot-password",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: data.email,
        }),
      }
    );

    const result = await res.json();

    if (!res.ok) {
      throw new Error(result.message || "Something went wrong");
    }

    alert(result.message || "Reset link sent");

    onSuccess?.();

  } catch (err: any) {
    alert(err.message || "Something went wrong");
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