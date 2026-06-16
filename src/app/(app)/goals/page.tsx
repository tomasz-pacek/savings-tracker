import { db } from "@/db";
import { goal } from "@/db/schema";
import { getCurrentSession } from "@/lib/auth-utils";
import { and, asc, count, desc, eq, ilike } from "drizzle-orm";
import { redirect } from "next/navigation";
import GoalsPageClient from "./_components/goals-page-client";

type Props = {
  searchParams: Promise<{
    search?: string;
    dateOrder?: "asc" | "desc";
    page?: string;
  }>;
};

export default async function GoalsPage({ searchParams }: Props) {
  const session = await getCurrentSession();

  if (!session) redirect("/login");

  const userId = session.user.id;

  const PAGE_SIZE = 6;

  const params = await searchParams;
  const searchValue = (params.search as string) ?? "";
  const dateOrder = (params.dateOrder as string) ?? "desc";
  const page = Number(params.page ?? "1");

  const orderFn = dateOrder === "desc" ? desc : asc;
  const [goals, [{ total }]] = await Promise.all([
    db
      .select()
      .from(goal)
      .where(and(eq(goal.userId, userId), ilike(goal.name, `%${searchValue}%`)))
      .orderBy(orderFn(goal.createdAt))
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
    <GoalsPageClient goals={goals} currentPage={page} totalPages={totalPages} />
  );
}
