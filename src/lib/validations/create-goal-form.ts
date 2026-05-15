import * as z from "zod";

export const createGoalFormSchema = z.object({
  name: z.string().min(5, "Name must be at least 5 characters."),
  targetAmount: z.number().positive("Target must be bigger than 0"),
  deadline: z.string().optional(),
});
