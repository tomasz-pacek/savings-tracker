"use server";

import { db } from "@/db";
import { goalDeposits, goal } from "@/db/schema";
import { getCurrentSession } from "@/lib/auth-utils";
import { and, eq, sql } from "drizzle-orm";
import { revalidatePath } from "next/cache";

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
      amount,
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

export const updateGoalDetails = async (
  goalId: string,
  goalName: string,
  targetAmount: number,
  deadline: string | null,
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

    await db
      .update(goal)
      .set({
        name: goalName,
        targetAmount,
        deadline: deadline || null,
      })
      .where(and(eq(goal.id, goalId), eq(goal.userId, session.user.id)));
    revalidatePath("/goals");

    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false, error: "Failed to update goal details." };
  }
};

export const deleteGoal = async (goalId: string) => {
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

    await db
      .delete(goal)
      .where(and(eq(goal.id, goalId), eq(goal.userId, session.user.id)));

    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false, error: "Failed to delete the goal." };
  }
};
