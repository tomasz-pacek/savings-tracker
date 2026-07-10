"use client";

import ActionButton from "@/components/shared/action-button";
import { Badge } from "@/components/ui/badge";
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
import { authClient } from "@/lib/auth-client";
import { loginFormSchema } from "@/lib/validations/login-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AtSign, EyeClosedIcon, EyeIcon, Lock } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";
import LastUsedBadge from "./last-used-badge";

export default function LoginForm() {
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
        onSuccess: () => {
          router.push("/");
          toast("User logged in successfully!");
        },
        onError: (ctx) => {
          toast(ctx.error.message || "Error logging in user");
        },
      },
    );
  };

  const lastLoginMethod = authClient.getLastUsedLoginMethod();
  console.log(lastLoginMethod);

  return (
    <form id="login-form" onSubmit={form.handleSubmit(onSubmit)}>
      <FieldGroup>
        <Controller
          name="email"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid} className="">
              <FieldLabel
                htmlFor="register-form-name"
                className="flex w-full items-center justify-between"
              >
                Email
              </FieldLabel>
              <InputGroup className="relative rounded-sm py-5">
                <InputGroupInput
                  {...field}
                  id="login-form-email"
                  aria-invalid={fieldState.invalid}
                  placeholder="name@example.com"
                  autoComplete="off"
                  autoFocus
                  className=""
                />
                <InputGroupAddon className="pr-2">
                  <AtSign />
                </InputGroupAddon>
                {lastLoginMethod === "email" && (
                  <div className="absolute -top-3 -right-3">
                    <LastUsedBadge />
                  </div>
                )}
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
              <FieldLabel htmlFor="register-form-name">Password</FieldLabel>
              <InputGroup className="rounded-sm py-5">
                <InputGroupInput
                  {...field}
                  id="login-form-password"
                  aria-invalid={fieldState.invalid}
                  placeholder="Enter your password"
                  autoComplete="off"
                  type={isPasswordVisible ? "text" : "password"}
                />
                <InputGroupAddon align={"inline-start"} className="pr-2">
                  <Lock />
                </InputGroupAddon>
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
        className="mt-6 w-full cursor-pointer rounded-sm py-5 text-base"
        disabled={form.formState.isSubmitting}
        isPending={form.formState.isSubmitting}
        type="submit"
        loadingSpinner
      >
        Login
      </ActionButton>
    </form>
  );
}
