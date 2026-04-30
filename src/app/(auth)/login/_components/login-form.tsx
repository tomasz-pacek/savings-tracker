"use client";

import ActionButton from "@/components/action-button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { authClient } from "@/lib/auth-client";
import { loginFormSchema } from "@/lib/validations/login-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { EyeClosedIcon, EyeIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

export default function LoginForm() {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof loginFormSchema>) => {
    await authClient.signIn.email(
      {
        email: data.email,
        password: data.password,
      },
      {
        onRequest: () => setIsSubmitting(true),
        onSuccess: () => {
          setIsSubmitting(false);
          toast("User logged in successfully!");
          router.push("/");
        },
        onError: (ctx) => {
          setIsSubmitting(false);
          toast(ctx.error.message || "Error logging in user");
        },
      },
    );
  };

  return (
    <form id="login-form" onSubmit={form.handleSubmit(onSubmit)}>
      <FieldGroup>
        <Controller
          name="email"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid} className="">
              <FieldLabel htmlFor="register-form-name">E-mail</FieldLabel>
              <Input
                {...field}
                id="login-form-email"
                aria-invalid={fieldState.invalid}
                placeholder="e.g alice.johnson@example.com"
                autoComplete="off"
                autoFocus
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="password"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid} className="">
              <FieldLabel htmlFor="register-form-name">Password</FieldLabel>
              <InputGroup>
                <InputGroupInput
                  {...field}
                  id="login-form-password"
                  aria-invalid={fieldState.invalid}
                  placeholder="••••••••••••••••"
                  autoComplete="off"
                  type={isPasswordVisible ? "text" : "password"}
                />
                <InputGroupAddon
                  align={"inline-end"}
                  className="cursor-pointer"
                  onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                >
                  {isPasswordVisible ? <EyeClosedIcon /> : <EyeIcon />}
                </InputGroupAddon>
              </InputGroup>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </FieldGroup>
      <ActionButton
        className="mt-6 w-full cursor-pointer"
        content="Login"
        disabled={isSubmitting}
        isPendingContent="Loggin in..."
        isPending={isSubmitting}
        type="submit"
      />
    </form>
  );
}
