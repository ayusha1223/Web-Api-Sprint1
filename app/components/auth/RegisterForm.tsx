"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "../ui/Input";
import Button from "../ui/Button";
import { registerSchema } from "@/app/schemas/registerSchema";

export default function RegisterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input label="Name" {...register("name")} error={errors.name?.message as string} />
      <Input label="Email" {...register("email")} error={errors.email?.message as string} />
      <Input label="Password" type="password" {...register("password")} error={errors.password?.message as string} />
      <Button text="Register" />
    </form>
  );
}
