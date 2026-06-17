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
import { addDepositFormSchema } from "@/lib/validations/add-deposit-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { DollarSign } from "lucide-react";
import { Controller, useForm, useWatch } from "react-hook-form";
import * as z from "zod";
import { addDepositToDatabase } from "../actions";
import { useParams } from "next/navigation";
import { toast } from "sonner";
import { Goal } from "@/db/schema";

type Props = {
  userGoal: Goal;
};

export default function AddDepositForm({ userGoal }: Props) {
  const params = useParams();
  const goalId = params.id as string;
  const form = useForm<z.infer<typeof addDepositFormSchema>>({
    resolver: zodResolver(addDepositFormSchema),
    defaultValues: {
      amount: 0,
      description: "",
    },
  });

  const { currentAmount, targetAmount } = userGoal;
  const remaining = targetAmount - currentAmount;
  const watchedAmount = useWatch({
    control: form.control,
    name: "amount",
  });

  const onSubmit = async (data: z.infer<typeof addDepositFormSchema>) => {
    const { amount, description } = data;
    const result = await addDepositToDatabase(amount, description, goalId);

    if (result.success) {
      toast("You've successfully added new deposit");
    } else {
      toast(result.error);
    }
    form.reset();
  };

  return (
    <form id="add-deposit-form" onSubmit={form.handleSubmit(onSubmit)}>
      <FieldGroup>
        <Controller
          name="amount"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid} className="">
              <FieldLabel htmlFor="add-deposit-form-amount">Amount</FieldLabel>
              <InputGroup>
                <InputGroupInput
                  {...field}
                  id="add-deposit-form-amount"
                  aria-invalid={fieldState.invalid}
                  placeholder="0.00"
                  autoComplete="off"
                  autoFocus
                  type="number"
                  onChange={(e) => {
                    const value = e.target.valueAsNumber;
                    field.onChange(isNaN(value) ? "" : value);
                  }}
                />
                <InputGroupAddon align={"inline-start"}>
                  <DollarSign />
                </InputGroupAddon>
              </InputGroup>
              {watchedAmount > remaining && (
                <FieldError
                  errors={[{ message: `Max deposit is $${remaining}` }]}
                />
              )}
            </Field>
          )}
        />
        <Controller
          name="description"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid} className="">
              <FieldLabel htmlFor="add-deposit-form-description">
                Note (optional)
              </FieldLabel>
              <Input
                {...field}
                id="add-deposit-form-description"
                aria-invalid={fieldState.invalid}
                placeholder="e.g Monthly savings"
                autoComplete="off"
                autoFocus
              />

              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </FieldGroup>
      <ActionButton
        className="mt-4 w-full rounded-full py-5"
        pendingText="Adding funds..."
        disabled={watchedAmount > remaining}
      >
        Add funds
      </ActionButton>
    </form>
  );
}
