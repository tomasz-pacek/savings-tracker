"use client";

import { registerFormSchema } from "@/lib/validations/register-form";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { useState } from "react";
import { AtSign, EyeClosedIcon, EyeIcon, Lock, User } from "lucide-react";
import ActionButton from "@/components/shared/action-button";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function RegisterForm() {
  const router = useRouter();
  const [show, setShow] = useState({
    password: false,
    confirmPassword: false,
  });

  const togglePassword = (value: keyof typeof show) => {
    setShow((prev) => ({
      ...prev,
      [value]: !prev[value],
    }));
  };

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const form = useForm<z.infer<typeof registerFormSchema>>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof registerFormSchema>) => {
    await authClient.signUp.email(
      {
        name: data.name,
        email: data.email,
        password: data.password,
      },
      {
        onRequest: () => setIsSubmitting(true),
        onSuccess: () => {
          setIsSubmitting(false);
          router.push("/");
          toast("Account created, verify your email.");
        },
        onError: (ctx) => {
          setIsSubmitting(false);
          toast(ctx.error.message || "Error registering user");
        },
      },
    );
  };

  return (
    <form id="register-form" onSubmit={form.handleSubmit(onSubmit)}>
      <FieldGroup>
        <Controller
          name="name"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid} className="">
              <FieldLabel htmlFor="register-form-name">Name</FieldLabel>
              <InputGroup className="rounded-sm py-5">
                <InputGroupInput
                  {...field}
                  id="register-form-name"
                  aria-invalid={fieldState.invalid}
                  placeholder="John Doe"
                  autoComplete="off"
                />
                <InputGroupAddon className="pr-2">
                  <User />
                </InputGroupAddon>
              </InputGroup>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="email"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid} className="">
              <FieldLabel htmlFor="register-form-email">E-mail</FieldLabel>
              <InputGroup className="rounded-sm py-5">
                <InputGroupInput
                  {...field}
                  id="register-form-email"
                  aria-invalid={fieldState.invalid}
                  placeholder="name@example.com"
                  autoComplete="off"
                />
                <InputGroupAddon className="pr-2">
                  <AtSign />
                </InputGroupAddon>
              </InputGroup>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="password"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid} className="">
              <FieldLabel htmlFor="register-form-password">Password</FieldLabel>
              <InputGroup className="rounded-sm py-5">
                <InputGroupInput
                  {...field}
                  id="register-form-password"
                  aria-invalid={fieldState.invalid}
                  placeholder="Enter your password"
                  autoComplete="off"
                  type={show.password ? "text" : "password"}
                />
                <InputGroupAddon className="pr-2">
                  <Lock />
                </InputGroupAddon>
                <InputGroupAddon
                  align={"inline-end"}
                  onClick={() => togglePassword("password")}
                  className="cursor-pointer"
                >
                  {show.password ? <EyeClosedIcon /> : <EyeIcon />}
                </InputGroupAddon>
              </InputGroup>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="confirmPassword"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid} className="">
              <FieldLabel htmlFor="register-form-confirm-password">
                Confirm Password
              </FieldLabel>
              <InputGroup className="rounded-sm py-5">
                <InputGroupInput
                  {...field}
                  id="register-form-confirm-password"
                  aria-invalid={fieldState.invalid}
                  placeholder="Confirm your password"
                  autoComplete="off"
                  type={show.confirmPassword ? "text" : "password"}
                />
                <InputGroupAddon className="pr-2">
                  <Lock />
                </InputGroupAddon>
                <InputGroupAddon
                  align={"inline-end"}
                  onClick={() => togglePassword("confirmPassword")}
                  className="cursor-pointer"
                >
                  {show.confirmPassword ? <EyeClosedIcon /> : <EyeIcon />}
                </InputGroupAddon>
              </InputGroup>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </FieldGroup>
      <ActionButton
        className="mt-6 w-full cursor-pointer rounded-sm py-5 text-base"
        disabled={isSubmitting}
        isPending={isSubmitting}
        type="submit"
        pendingText="Registering..."
      >
        Register
      </ActionButton>
    </form>
  );
}
