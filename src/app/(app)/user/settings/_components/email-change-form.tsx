"use client";

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
import { zodResolver } from "@hookform/resolvers/zod";
import { User } from "better-auth";
import { AtSign } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";
import { changeEmailAction } from "../actions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import ActionButton from "@/components/shared/action-button";

const formSchema = z.object({
  email: z.string().email("Invalid email address"),
});

type Props = {
  user: User;
};

export default function EmailChangeForm({ user }: Props) {
  const router = useRouter();
  const { email } = user;
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email,
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    const { email } = data;
    try {
      await changeEmailAction(email);
      toast("You have changed your email");
      router.refresh();
      form.reset(data);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Someting went wrong";
      toast(message);

      form.setError("email", {
        type: "server",
        message,
      });
    }
  };

  return (
    <form
      id="email-change-form"
      className="w-full"
      onSubmit={form.handleSubmit(onSubmit)}
    >
      <FieldGroup>
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
      <div className="mt-4 flex items-center">
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
