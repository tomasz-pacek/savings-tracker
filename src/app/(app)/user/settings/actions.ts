"use server";

import { auth } from "@/lib/auth";
import { getCurrentSession } from "@/lib/auth-utils";
import {
  emailChangeLimiter,
  usernameUpdateLimiter,
} from "@/lib/redis/rate-limit";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";

export const changeEmailAction = async (newEmail: string) => {
  const session = await getCurrentSession();
  if (!session) return { success: false, message: "Unathorized" };

  const limit = await emailChangeLimiter.limit(`email:${session.user.id}`);

  if (!limit.success)
    return {
      success: false,
      message: "You can change email only 3 times per hour",
    };

  await auth.api.changeEmail({
    body: {
      newEmail,
      callbackURL: "/user/settings",
    },
    headers: await headers(),
  });
  revalidatePath("/user/settings");

  return { success: true };
};

export const updateUsernameAction = async (newUsername: string) => {
  const session = await getCurrentSession();
  if (!session) return { success: false, message: "Unathorized" };

  const limit = await usernameUpdateLimiter.limit(
    `username:${session.user.id}`,
  );

  if (!limit.success)
    return {
      success: false,
      message: "You can change username only 3 times per 5 minutes",
    };

  await auth.api.updateUser({
    body: {
      name: newUsername,
    },
    headers: await headers(),
  });
  revalidatePath("/user/settings");

  return { success: true };
};
