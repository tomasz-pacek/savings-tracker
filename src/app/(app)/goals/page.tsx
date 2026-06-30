import { db } from "@/db";
import { goal } from "@/db/schema";
import { getCurrentSession } from "@/lib/auth-utils";
import { and, asc, count, desc, eq, ilike, sql } from "drizzle-orm";
import { redirect } from "next/navigation";
import GoalsPageClient from "./_components/goals-page-client";
import { Metadata } from "next";

type Props = {
  searchParams: Promise<{
    search?: string;
    sort?: "date-desc" | "date-asc" | "progress-asc" | "progress-desc";
    hideCompleted?: boolean;
    page?: string;
  }>;
};

export const metadata: Metadata = {
  title: "Goals",
  //TODO: description: "",
};
const progressExpression = sql`(${goal.currentAmount}::float / NULLIF(${goal.targetAmount}, 0))`;
const ORDER_MAP = {
  "date-asc": asc(goal.createdAt),
  "date-desc": desc(goal.createdAt),
  "progress-asc": asc(progressExpression),
  "progress-desc": desc(progressExpression),
} as const;
const notCompletedExpression = sql`${goal.currentAmount} < ${goal.targetAmount}`;

export default async function GoalsPage({ searchParams }: Props) {
  const session = await getCurrentSession();

  if (!session) redirect("/login");

  const userId = session.user.id;

  const PAGE_SIZE = 6;

  const params = await searchParams;
  const searchValue = params.search ?? "";
  const sort = params.sort ?? "date-desc";
  const hideCompleted = params.hideCompleted ?? false;
  const page = Number(params.page ?? "1");

  const orderBy = ORDER_MAP[sort ?? "date-desc"];

  const baseWhere = and(
    eq(goal.userId, userId),
    ilike(goal.name, `%${searchValue}%`),
  );

  const whereCondition = hideCompleted
    ? and(baseWhere, notCompletedExpression)
    : baseWhere;

  const [goals, [{ total }]] = await Promise.all([
    db
      .select()
      .from(goal)
      .where(whereCondition)
      .orderBy(orderBy)
      .limit(PAGE_SIZE)
      .offset((page - 1) * PAGE_SIZE),

    db
      .select({ total: count() })
      .from(goal)
      .where(
        and(eq(goal.userId, userId), ilike(goal.name, `%${searchValue}%`)),
      ),
  ]);

  const totalPages = Math.ceil(total / PAGE_SIZE);

  return (
    <GoalsPageClient
      goals={goals}
      currentPage={page}
      totalPages={totalPages}
      totalGoalsCount={total}
    />
  );
}
