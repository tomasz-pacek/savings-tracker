"use server";

import { db } from "@/db";
import { goalDeposits, goal } from "@/db/schema";
import { getCurrentSession } from "@/lib/auth-utils";
import { and, eq, sql } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { success } from "zod";

export const addDepositToDatabase = async (
  amount: number,
  description: string | undefined,
  goalId: string,
) => {
  const session = await getCurrentSession();
  if (!session) {
    return { success: false, error: "Unauthorized" };
  }

  try {
    const userGoal = await db
      .select()
      .from(goal)
      .where(and(eq(goal.id, goalId), eq(goal.userId, session.user.id)))
      .limit(1);

    if (!userGoal.length) {
      return { success: false, error: "Goal not found" };
    }

    await db.insert(goalDeposits).values({
      userId: session.user.id,
      goalId,
      amount: amount.toString(),
      description,
    });

    await db
      .update(goal)
      .set({
        currentAmount: sql`${goal.currentAmount} + ${amount}`,
      })
      .where(and(eq(goal.id, goalId), eq(goal.userId, session.user.id)));

    revalidatePath("/goals");
    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false, error: "Failed to add deposit" };
  }
};
