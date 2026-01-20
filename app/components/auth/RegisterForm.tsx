"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "@/app/schemas/registerSchema";
import { useRouter } from "next/navigation";
import { registerAction } from "@/app/lib/actions/auth.action";

export default function RegisterForm() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: any) => {
    try {
      await registerAction(data);
      alert("Registration successful");
      router.push("/login");
    } catch (error: any) {
      alert(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>Name</label>
      <input {...register("name")} />
      {errors.name && <p>{errors.name.message as string}</p>}

      <label>Email</label>
      <input {...register("email")} />
      {errors.email && <p>{errors.email.message as string}</p>}

      <label>Password</label>
      <input type="password" {...register("password")} />
      {errors.password && <p>{errors.password.message as string}</p>}

      <button type="submit">Register</button>
    </form>
  );
}
