import { tool } from "ai";
import { z } from "zod";
import { db } from "@/db";
import { goal, goalDeposits } from "@/db/schema";
import { eq, and } from "drizzle-orm";

export function createSavingsTools(userId: string) {
  return {
    getSavingsGoals: tool({
      description:
        "Fetches the list of the user's savings goals along with their current progress.",
      inputSchema: z.object({}),
      execute: async () => {
        return db.select().from(goal).where(eq(goal.userId, userId));
      },
    }),

    getSavingsGoalDetails: tool({
      description:
        "Fetches details of a specific savings goal by its id, including its deposit history.",
      inputSchema: z.object({
        goalId: z.string().describe("ID of the savings goal"),
      }),
      execute: async ({ goalId }) => {
        const [goalRow] = await db
          .select()
          .from(goal)
          .where(and(eq(goal.id, goalId), eq(goal.userId, userId)));

        if (!goalRow) return { error: "No goal found with this id." };

        const deposits = await db
          .select()
          .from(goalDeposits)
          .where(eq(goalDeposits.goalId, goalId));

        return { goal: goalRow, deposits };
      },
    }),

    getTotalSavings: tool({
      description:
        "Returns the sum of all of the user's savings across all goals.",
      inputSchema: z.object({}),
      execute: async () => {
        const goals = await db
          .select()
          .from(goal)
          .where(eq(goal.userId, userId));
        const total = goals.reduce((sum, g) => sum + g.currentAmount, 0);
        return { total };
      },
    }),
  };
}
