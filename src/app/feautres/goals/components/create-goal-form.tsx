"use client";

import ActionButton from "@/components/action-button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { createGoalFormSchema } from "@/lib/validations/create-goal-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CirclePlus } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";
import { toast } from "sonner";
import { createGoalAction } from "../actions";
import { useGoalDialogStore } from "../store/use-goal-dialog-store";

export default function CreateGoalForm() {
  const { close } = useGoalDialogStore();

  const form = useForm<z.infer<typeof createGoalFormSchema>>({
    resolver: zodResolver(createGoalFormSchema),
    defaultValues: {
      name: "",
      targetAmount: 100,
      deadline: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof createGoalFormSchema>) => {
    const { name, targetAmount, deadline } = data;
    const result = await createGoalAction(name, targetAmount, deadline);

    //dialog close
    close();

    if (result?.success) {
      toast("You created new goal.");
    } else {
      toast(result?.error);
    }
  };

  return (
    <form id="create-goal-form" onSubmit={form.handleSubmit(onSubmit)}>
      <FieldGroup>
        <Controller
          name="name"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid} className="">
              <FieldLabel htmlFor="create-goal-name">Goal name</FieldLabel>
              <Input
                {...field}
                id="create-goal-name"
                aria-invalid={fieldState.invalid}
                placeholder="MacBook Pro M4"
                autoComplete="off"
                autoFocus
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="targetAmount"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid} className="">
              <FieldLabel htmlFor="create-goal-target-amount">
                Target Amount
              </FieldLabel>
              <Input
                {...field}
                id="create-goal-target-amount"
                aria-invalid={fieldState.invalid}
                autoComplete="off"
                autoFocus
                type="number"
                onChange={(e) => {
                  const value = e.target.valueAsNumber;
                  field.onChange(isNaN(value) ? "" : value);
                }}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="deadline"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid} className="">
              <FieldLabel htmlFor="create-goal-deadline">
                Deadline (optional)
              </FieldLabel>
              <Input
                {...field}
                id="create-goal-deadline"
                aria-invalid={fieldState.invalid}
                autoComplete="off"
                autoFocus
                type="datetime-local"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </FieldGroup>
      <ActionButton className="w-full mt-6 font-medium">
        <CirclePlus />
        Add new goal
      </ActionButton>
    </form>
  );
}

//name
//targetamount
//deadline
