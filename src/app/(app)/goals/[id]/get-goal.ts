import { db } from "@/db";
import { goal } from "@/db/schema";
import { and, eq } from "drizzle-orm";
import { cache } from "react";

export const getGoal = cache(async (goalId: string, userId: string) => {
  return db
    .select()
    .from(goal)
    .where(and(eq(goal.id, goalId), eq(goal.userId, userId)))
    .limit(1)
    .then((rows) => rows[0]);
});
