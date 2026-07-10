"use client";

import ActionButton from "@/components/shared/action-button";
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
import { User as UserIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";
import { updateUsernameAction } from "../actions";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters long"),
});

type Props = {
  user: User;
};

export default function UsernameChangeForm({ user }: Props) {
  const router = useRouter();
  const { name } = user;
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name,
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    const { name } = data;
    try {
      await updateUsernameAction(name);
      toast("You have changed you username");
      router.refresh();
      form.reset({ name });
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Something went wrong";
      toast(message);

      form.setError("name", {
        type: "server",
        message,
      });
    }
  };

  return (
    <form
      id="username-change-form"
      className="w-full"
      onSubmit={form.handleSubmit(onSubmit)}
    >
      <FieldGroup>
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
      </FieldGroup>
      <div className="j mt-4 flex items-center">
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
