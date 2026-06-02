import { Card, CardContent } from "@/components/ui/card";
import { db } from "@/db";
import { goal } from "@/db/schema";
import { getCurrentSession } from "@/lib/auth-utils";
import { and, count, eq, gte, sql } from "drizzle-orm";

type Props = {
  goalsCount: number;
};

export default async function DashboardStats({ goalsCount }: Props) {
  const session = await getCurrentSession();
  if (!session?.user.id) return <div>No user</div>;

  const completedGoals = await db
    .select({ count: count() })
    .from(goal)
    .where(
      and(
        eq(goal.userId, session.user.id),
        gte(
          sql`CAST(${goal.currentAmount} AS numeric)`,
          sql`CAST(${goal.targetAmount} AS numeric)`,
        ),
      ),
    )
    .then((rows) => rows[0]);

  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
      <Card className="bg-primary text-primary-foreground border-0 sm:col-span-2">
        <CardContent className="flex flex-col justify-between h-full gap-4">
          <p className="text-sm mb-1 font-medium">Total savings</p>
          <p className="text-4xl font-bold">0,00 zł</p>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="flex flex-col justify-between h-full gap-4">
          <p className="text-sm mb-1 font-medium">Active goals</p>
          <p className="text-4xl font-bold text-primary">{goalsCount}</p>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="flex flex-col justify-between h-full gap-4">
          <p className="text-sm mb-1 font-medium">Goals completed</p>
          <p className="text-4xl font-bold text-success">
            {completedGoals.count}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
