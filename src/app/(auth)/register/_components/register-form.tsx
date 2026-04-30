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
import { Input } from "@/components/ui/input";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { useState } from "react";
import { EyeClosedIcon, EyeIcon } from "lucide-react";
import ActionButton from "@/components/action-button";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function RegisterForm() {
  const router = useRouter();
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState<boolean>(false);
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
          toast("User registered successfully!");
          router.push("/");
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
              <Input
                {...field}
                id="register-form-name"
                aria-invalid={fieldState.invalid}
                placeholder="e.g Alice Johnson"
                autoComplete="off"
              />
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
              <Input
                {...field}
                id="register-form-email"
                aria-invalid={fieldState.invalid}
                placeholder="e.g alice.johnson@example.com"
                autoComplete="off"
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
              <FieldLabel htmlFor="register-form-password">Password</FieldLabel>
              <InputGroup>
                <InputGroupInput
                  {...field}
                  id="register-form-password"
                  aria-invalid={fieldState.invalid}
                  placeholder="••••••••••••••••"
                  autoComplete="off"
                  type={isPasswordVisible ? "text" : "password"}
                />
                <InputGroupAddon
                  align={"inline-end"}
                  onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                  className="cursor-pointer"
                >
                  {isPasswordVisible ? <EyeClosedIcon /> : <EyeIcon />}
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
              <InputGroup>
                <InputGroupInput
                  {...field}
                  id="register-form-confirm-password"
                  aria-invalid={fieldState.invalid}
                  placeholder="••••••••••••••••"
                  autoComplete="off"
                  type={isPasswordVisible ? "text" : "password"}
                />
                <InputGroupAddon
                  align={"inline-end"}
                  onClick={() =>
                    setIsConfirmPasswordVisible(!isConfirmPasswordVisible)
                  }
                  className="cursor-pointer"
                >
                  {isConfirmPasswordVisible ? <EyeClosedIcon /> : <EyeIcon />}
                </InputGroupAddon>
              </InputGroup>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </FieldGroup>
      <ActionButton
        content="Register"
        className="mt-6 w-full cursor-pointer"
        disabled={isSubmitting}
        isPending={isSubmitting}
        isPendingContent="Registering..."
        type="submit"
      />
    </form>
  );
}
