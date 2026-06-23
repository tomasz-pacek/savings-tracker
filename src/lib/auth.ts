import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "../db/index";
import { nextCookies } from "better-auth/next-js";
import * as schema from "../db/schema";
import { Resend } from "resend";
import ConfirmEmailTemplate from "@/app/(feautres)/emails/confirm-email";

const resend = new Resend(process.env.RESEND_API_KEY);

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: schema,
  }),
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
  },
  emailVerification: {
    sendVerificationEmail: async ({ user, url }) => {
      await resend.emails.send({
        from: "onboarding@resend.dev",
        to: user.email,
        subject: "Verify your email",
        react: ConfirmEmailTemplate({ name: user.name, confirmUrl: url }),
      });
    },
    sendOnSignUp: true,
  },
  user: {
    deleteUser: {
      enabled: true,
    },
  },
  plugins: [nextCookies()],
});
