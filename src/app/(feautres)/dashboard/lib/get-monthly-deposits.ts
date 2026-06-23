import { db } from "@/db";
import { goalDeposits } from "@/db/schema";
import { and, eq, gte, sql } from "drizzle-orm";

const MONTH_LABELS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export const getMonthlyDeposits = async (userId: string) => {
  const tvelveMonthsAgo = new Date();
  tvelveMonthsAgo.setMonth(tvelveMonthsAgo.getMonth() - 11);
  tvelveMonthsAgo.setDate(1);
  tvelveMonthsAgo.setHours(0, 0, 0, 0);

  const rows = await db
    .select({
      year: sql<number>`EXTRACT(YEAR FROM ${goalDeposits.createdAt})::int`,
      month: sql<number>`EXTRACT(MONTH FROM ${goalDeposits.createdAt})::int`,
      total: sql<number>`SUM(${goalDeposits.amount})::int`,
    })
    .from(goalDeposits)
    .where(
      and(
        eq(goalDeposits.userId, userId),
        gte(goalDeposits.createdAt, tvelveMonthsAgo),
      ),
    )
    .groupBy(
      sql`EXTRACT(YEAR FROM ${goalDeposits.createdAt}), EXTRACT(MONTH FROM ${goalDeposits.createdAt})`,
    )
    .orderBy(
      sql`EXTRACT(YEAR FROM ${goalDeposits.createdAt}), EXTRACT(MONTH FROM ${goalDeposits.createdAt})`,
    );

  const map = new Map<string, number>();
  for (const row of rows) {
    map.set(`${row.year}-${String(row.month).padStart(2, "0")}`, row.total);
  }

  const result: { month: string; total: number }[] = [];
  const now = new Date();

  for (let i = 11; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
    result.push({
      month: MONTH_LABELS[d.getMonth()],
      total: map.get(key) ?? 0,
    });
  }

  return result;
};
