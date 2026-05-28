import * as z from "zod";

export const addDepositFormSchema = z.object({
  amount: z.number().positive("Amount must be bigger than 0"),
  description: z
    .string()
    .max(32, "Note can't be longer than 32 characters.")
    .optional(),
});
