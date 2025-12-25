"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "../ui/Input";
import Button from "../ui/Button";
import { loginSchema } from "@/app/schemas/loginSchema";

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input label="Email" {...register("email")} error={errors.email?.message as string} />
      <Input label="Password" type="password" {...register("password")} error={errors.password?.message as string} />
      <Button text="Login" />
    </form>
  );
}
