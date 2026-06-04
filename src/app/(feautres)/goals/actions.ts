"use server";

import { db } from "@/db";
import { goal } from "@/db/schema";
import { getCurrentSession } from "@/lib/auth-utils";
import { revalidatePath } from "next/cache";

export async function createGoalAction(
  name: string,
  targetAmount: number,
  deadline?: string,
) {
  //USER SAFETY CHECK
  const session = await getCurrentSession();
  if (!session) {
    return { success: false, error: "Unathorized" };
  }

  try {
    await db.insert(goal).values({
      userId: session.user.id,
      name,
      targetAmount,
      deadline,
    });
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error(error);

    return {
      success: false,
      error: "Failed to create a goal",
    };
  }
}
