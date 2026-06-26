"use server";

import { db } from "@/db";
import { goal, goalDeposits } from "@/db/schema";
import { getCurrentSession } from "@/lib/auth-utils";
import { eq } from "drizzle-orm";

const escapeCSV = (value: string | number | null | undefined): string => {
  if (value === null || value === undefined) return "";
  const str = String(value);
  if (str.includes(",") || str.includes("\n") || str.includes('"')) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
};

const toCSV = (rows: Record<string, unknown>[]): string => {
  if (rows.length === 0) return "(no data)";
  const keys = Object.keys(rows[0]);
  const header = keys.map(escapeCSV).join(",");
  const data = rows.map((row) =>
    keys.map((k) => escapeCSV(row[k] as string | number | null)).join(","),
  );
  return [header, ...data].join("\n");
};

export const exportUserDataAsCSV = async (): Promise<string> => {
  const session = await getCurrentSession();
  if (!session?.user) throw new Error("Unathorized");

  const userId = session.user.id;

  const goals = await db.select().from(goal).where(eq(goal.userId, userId));
  const deposits = await db
    .select()
    .from(goalDeposits)
    .where(eq(goalDeposits.userId, userId));

  const now = new Date().toISOString().slice(0, 10);

  const goalsCSV = toCSV(
    goals.map((g) => ({
      ID: g.id,
      Name: g.name,
      Goal: g.targetAmount,
      Saved: g.currentAmount,
      Progress: Math.round((g.currentAmount / g.targetAmount) * 100),
      Deadline: g.deadline ?? "",
      Created: new Date(g.createdAt).toISOString(),
    })),
  );

  const depositsCSV = toCSV(
    deposits.map((d) => ({
      ID: d.id,
      "Goal ID": d.goalId,
      Amount: d.amount,
      Description: d.description,
      Created: new Date(d.createdAt).toISOString(),
    })),
  );

  return [
    `# Data export - ${now}`,
    `# Goals`,
    goalsCSV,
    "",
    `# Deposits`,
    depositsCSV,
  ].join("\n");
};
