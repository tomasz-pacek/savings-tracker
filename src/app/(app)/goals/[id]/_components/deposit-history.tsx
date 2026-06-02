import { db } from "@/db";
import { goalDeposits } from "@/db/schema";
import { getCurrentSession } from "@/lib/auth-utils";
import { formatTimestampDate } from "@/lib/format-timestamp-date";
import { and, desc, eq } from "drizzle-orm";
import { ArrowDown } from "lucide-react";

type Props = {
  goalId: string;
};

export default async function DepositHistory({ goalId }: Props) {
  const session = await getCurrentSession();

  if (!session) {
    return <div>No user logged in</div>;
  }

  const deposits = await db
    .select()
    .from(goalDeposits)
    .where(
      and(
        eq(goalDeposits.userId, session.user.id),
        eq(goalDeposits.goalId, goalId),
      ),
    )
    .orderBy(desc(goalDeposits.createdAt));

  return (
    <div className="flex flex-col items-center justify-center mt-6">
      <div className="lg:w-3/5 border-b pb-3 flex items-center justify-between ">
        <h3 className="text-xl">Deposit history</h3>
        <p className="text-muted-foreground">
          {deposits.length} {deposits.length == 1 ? "deposit" : "deposits"}
        </p>
      </div>
      {deposits.length !== 0 ? (
        <div className="w-full flex flex-col items-center justify-center gap-4 lg:w-3/5 my-4">
          {deposits.map((deposit) => (
            <div
              key={deposit.id}
              className="w-full flex items-center justify-between"
            >
              <div className="flex items-center justify-center gap-2">
                <div className="bg-muted-foreground/15 rounded-full p-2">
                  <ArrowDown />
                </div>
                <div className="flex flex-col items-start justify-center gap-1">
                  {deposit.description && (
                    <p className="text-sm">{deposit.description}</p>
                  )}
                  <p className="text-sm text-muted-foreground">
                    {formatTimestampDate(deposit.createdAt)}
                  </p>
                </div>
              </div>
              <p className="text-base text-success">+${deposit.amount}</p>
            </div>
          ))}
        </div>
      ) : (
        <div className="mt-6 text-muted-foreground">
          You don&apos;t have any deposits yet.
        </div>
      )}
    </div>
  );
}
