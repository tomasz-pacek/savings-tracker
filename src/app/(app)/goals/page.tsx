import { db } from "@/db";
import { goal } from "@/db/schema";
import { getCurrentSession } from "@/lib/auth-utils";
import { and, asc, desc, eq, ilike } from "drizzle-orm";
import { redirect } from "next/navigation";
import GoalsPageClient from "./_components/goals-page-client";

type Props = {
  searchParams: Promise<{
    search?: string;
    dateOrder?: "asc" | "desc";
  }>;
};

export default async function GoalsPage({ searchParams }: Props) {
  const session = await getCurrentSession();

  if (!session) redirect("/login");

  const userId = session.user.id;

  const params = await searchParams;
  const searchValue = (params.search as string) ?? "";
  const dateOrder = (params.dateOrder as string) ?? "desc";

  console.log("page:", dateOrder);

  const orderFn = dateOrder === "desc" ? desc : asc;
  const goals = await db
    .select()
    .from(goal)
    .where(and(eq(goal.userId, userId), ilike(goal.name, `%${searchValue}%`)))
    .orderBy(orderFn(goal.createdAt));

  return <GoalsPageClient goals={goals} />;
}
