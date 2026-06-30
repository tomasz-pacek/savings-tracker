"use client";

import ActionButton from "@/components/shared/action-button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { createGoalFormSchema } from "@/lib/validations/create-goal-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";
import { toast } from "sonner";
import { useEditGoalDialogStore } from "../store/use-edit-goal-dialog-store";
import { updateGoalDetails } from "../actions";
import { useParams } from "next/navigation";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { DollarSign, Target } from "lucide-react";

type Props = {
  goalName: string;
  targetAmount: number;
  deadline: string | null;
};

export default function EditGoalForm({
  goalName,
  targetAmount,
  deadline,
}: Props) {
  const { close } = useEditGoalDialogStore();
  const params = useParams();

  const form = useForm<z.infer<typeof createGoalFormSchema>>({
    resolver: zodResolver(createGoalFormSchema),
    defaultValues: {
      name: goalName,
      targetAmount: Number(targetAmount),
      deadline: deadline ? deadline : "",
    },
  });

  const onSubmit = async (data: z.infer<typeof createGoalFormSchema>) => {
    const { name, targetAmount, deadline } = data;
    console.log(data);

    const result = await updateGoalDetails(
      params.id as string,
      name,
      targetAmount,
      deadline ?? null,
    );

    if (result.success) {
      toast("Goal updated");
      close();
    } else {
      toast(result.error);
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
              <InputGroup className="rounded-sm py-5">
                <InputGroupInput
                  {...field}
                  id="create-goal-name"
                  aria-invalid={fieldState.invalid}
                  placeholder="MacBook Pro M4"
                  autoComplete="off"
                  autoFocus
                />
                <InputGroupAddon className="pr-2">
                  <Target />
                </InputGroupAddon>
              </InputGroup>

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
              <InputGroup className="rounded-sm py-5">
                <InputGroupInput
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
                <InputGroupAddon className="pr-2">
                  <DollarSign />
                </InputGroupAddon>
              </InputGroup>

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
                className="rounded-sm py-5"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </FieldGroup>
      <ActionButton className="mt-6 w-full rounded-sm py-5 text-base">
        Update goal
      </ActionButton>
    </form>
  );
}
