import * as z from "zod";
import { passwordSchema } from "./password";

export const loginFormSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: passwordSchema,
});
