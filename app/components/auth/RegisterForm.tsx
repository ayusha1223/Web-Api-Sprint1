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
      alert(error.response?.data?.message || "Registration failed");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>Name</label>
      <input className="input" {...register("name")} />
      {errors.name && <p className="error">{errors.name.message as string}</p>}

      <label>Email</label>
      <input className="input" {...register("email")} />
      {errors.email && <p className="error">{errors.email.message as string}</p>}

      <label>Phone Number</label>
      <input className="input" {...register("phone")} />
      {errors.phone && <p className="error">{errors.phone.message as string}</p>}

      <label>Password</label>
      <input type="password" className="input" {...register("password")} />
      {errors.password && (
        <p className="error">{errors.password.message as string}</p>
      )}

      <button type="submit" className="btn">
        Register
      </button>
    </form>
  );
}
