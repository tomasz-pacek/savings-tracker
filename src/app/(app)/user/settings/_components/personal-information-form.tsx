"use client";

import ActionButton from "@/components/shared/action-button";
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
import { personalInformationFormSchema } from "@/lib/validations/personal-information-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { User } from "better-auth";
import { AtSign, Check, User as UserIcon, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

type Props = {
  user: User;
};

export default function PersonalInformationForm({ user }: Props) {
  const router = useRouter();
  const { name, email, emailVerified } = user;
  const form = useForm<z.infer<typeof personalInformationFormSchema>>({
    resolver: zodResolver(personalInformationFormSchema),
    defaultValues: {
      name,
      email,
    },
  });

  const onSubmit = async (
    data: z.infer<typeof personalInformationFormSchema>,
  ) => {
    const promises = [];
    let shouldUpdate = false;

    if (name !== data.name) {
      promises.push(
        authClient.updateUser(
          { name: data.name },
          {
            onSuccess: () => {
              toast("Name updated successfully");
              shouldUpdate = true;
            },
          },
        ),
      );
    }

    if (email !== data.email) {
      promises.push(
        authClient.changeEmail(
          {
            newEmail: data.email,
            callbackURL: "/account/settings",
          },
          {
            onError: (ctx) => {
              toast(ctx.error.message || "Error changing email");
            },
            onSuccess: () => {
              toast("Email updated successfully");
              shouldUpdate = true;
            },
          },
        ),
      );
    }

    if (promises.length === 0) return;

    await Promise.all(promises);

    if (shouldUpdate) {
      router.refresh();
      form.reset(data);
    }
  };

  return (
    <form
      id="personal-information-form"
      className="w-full"
      onSubmit={form.handleSubmit(onSubmit)}
    >
      <FieldGroup className="flex flex-col items-center justify-center md:flex-row">
        <Controller
          name="name"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>Name</FieldLabel>
              <InputGroup className="rounded-sm py-5">
                <InputGroupInput
                  {...field}
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                  placeholder=""
                  autoComplete="off"
                />
                <InputGroupAddon className="pr-2">
                  <UserIcon />
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
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>E-mail</FieldLabel>
              <InputGroup className="rounded-sm py-5">
                <InputGroupInput
                  {...field}
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                  placeholder=""
                  autoComplete="off"
                  className="rounded-sm py-5"
                />
                <InputGroupAddon>
                  <AtSign />
                </InputGroupAddon>
              </InputGroup>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </FieldGroup>
      <div className="mt-4 flex items-center justify-between">
        {emailVerified ? (
          <div className="flex flex-row items-center justify-center gap-2">
            <Check className="text-success bg-success/10 rounded-xl p-1" />
            Email verified
          </div>
        ) : (
          <div className="flex flex-row items-center justify-center gap-2">
            <X className="text-destructive bg-destructive/10 rounded-xl p-1" />
            Email not verified
          </div>
        )}
        <ActionButton
          isPending={form.formState.isSubmitting}
          disabled={!form.formState.isDirty || form.formState.isSubmitting}
          className="rounded-sm p-4"
          loadingSpinner
        >
          Save
        </ActionButton>
      </div>
    </form>
  );
}
