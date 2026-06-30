"use client";

import ActionButton from "@/components/shared/action-button";
import PasswordRequirements from "@/components/shared/password-requirements";
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
import { changePasswordFormSchema } from "@/lib/validations/change-password-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeClosed, Lock } from "lucide-react";
import { useState } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";
export default function ChangePasswordForm() {
  const [showPassword, setShowPassword] = useState({
    currentPassword: false,
    newPassword: false,
    confirmNewPassword: false,
  });

  const togglePassword = (field: keyof typeof showPassword) => {
    setShowPassword((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const form = useForm<z.infer<typeof changePasswordFormSchema>>({
    resolver: zodResolver(changePasswordFormSchema),
    mode: "onChange",
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    },
  });

  const watchNewPassword = useWatch({
    control: form.control,
    name: "newPassword",
  });

  const onSubmit = async (data: z.infer<typeof changePasswordFormSchema>) => {
    const { currentPassword, newPassword, confirmNewPassword } = data;

    if (newPassword !== confirmNewPassword)
      return toast("Passwords do not match");

    await authClient.changePassword(
      {
        newPassword,
        currentPassword,
        revokeOtherSessions: true,
      },
      {
        onSuccess: () => {
          toast("You've changed your password");
        },
        onError: (ctx) => {
          console.error(ctx.error.message);
          toast(ctx.error.message);
        },
      },
    );
  };

  return (
    <div className="w-full space-y-6">
      <form
        id="change-password-form"
        className="w-full"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FieldGroup className="flex w-full items-center justify-center gap-6 lg:flex-row">
          <Controller
            name="currentPassword"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Current Password</FieldLabel>
                <InputGroup className="rounded-sm py-5">
                  <InputGroupInput
                    {...field}
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    placeholder="Enter your password"
                    autoComplete="off"
                    type={showPassword.currentPassword ? "text" : "password"}
                  />
                  <InputGroupAddon className="pr-2">
                    <Lock />
                  </InputGroupAddon>
                  <InputGroupAddon
                    className="cursor-pointer"
                    align="inline-end"
                    onClick={() => togglePassword("currentPassword")}
                  >
                    {showPassword.currentPassword ? <EyeClosed /> : <Eye />}
                  </InputGroupAddon>
                </InputGroup>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            name="newPassword"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>New Password</FieldLabel>
                <InputGroup className="rounded-sm py-5">
                  <InputGroupInput
                    {...field}
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    placeholder="Enter new password"
                    autoComplete="off"
                    type={showPassword.newPassword ? "text" : "password"}
                  />
                  <InputGroupAddon className="pr-2">
                    <Lock />
                  </InputGroupAddon>
                  <InputGroupAddon
                    className="cursor-pointer"
                    align="inline-end"
                    onClick={() => togglePassword("newPassword")}
                  >
                    {showPassword.newPassword ? <EyeClosed /> : <Eye />}
                  </InputGroupAddon>
                </InputGroup>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            name="confirmNewPassword"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>
                  Confirm New Password
                </FieldLabel>
                <InputGroup className="rounded-sm py-5">
                  <InputGroupInput
                    {...field}
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    placeholder="Confirm new password"
                    autoComplete="off"
                    type={showPassword.confirmNewPassword ? "text" : "password"}
                  />
                  <InputGroupAddon className="pr-2">
                    <Lock />
                  </InputGroupAddon>
                  <InputGroupAddon
                    className="cursor-pointer"
                    align="inline-end"
                    onClick={() => togglePassword("confirmNewPassword")}
                  >
                    {showPassword.confirmNewPassword ? <EyeClosed /> : <Eye />}
                  </InputGroupAddon>
                </InputGroup>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </FieldGroup>
      </form>
      <div className="flex w-full items-end justify-between">
        <PasswordRequirements password={watchNewPassword} />
        <ActionButton
          form="change-password-form"
          disabled={!form.formState.isValid}
          type="submit"
          className="px-4"
        >
          Save
        </ActionButton>
      </div>
    </div>
  );
}
