import { Card, CardContent } from "@/components/ui/card";
import { getCompletedGoals } from "@/db/queries";
import { getCurrentSession } from "@/lib/auth-utils";
import { redirect } from "next/navigation";

type Props = {
  goalsCount: number;
  userTotalSavingsValue: number;
};

export default async function DashboardStats({
  goalsCount,
  userTotalSavingsValue,
}: Props) {
  const session = await getCurrentSession();
  if (!session?.user.id) redirect("/login");

  const completedGoals = await getCompletedGoals(session.user.id);

  return (
    <div className="mb-8 grid w-full grid-cols-1 gap-4 md:grid-cols-4">
      <Card className="bg-primary text-primary-foreground border-0 sm:col-span-2">
        <CardContent className="flex h-full flex-col justify-between gap-4">
          <p className="mb-1 text-sm font-medium">Total savings</p>
          <p className="text-4xl font-bold">{userTotalSavingsValue}$</p>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="flex h-full flex-col justify-between gap-4">
          <p className="mb-1 text-sm font-medium">Active goals</p>
          <p className="text-primary text-4xl font-bold">{goalsCount}</p>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="flex h-full flex-col justify-between gap-4">
          <p className="mb-1 text-sm font-medium">Goals completed</p>
          <p className="text-success text-4xl font-bold">
            {completedGoals.count}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
