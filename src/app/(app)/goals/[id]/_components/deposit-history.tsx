import { db } from "@/db";
import { goalDeposits } from "@/db/schema";
import { getCurrentSession } from "@/lib/auth-utils";
import { formatDate } from "@/lib/format-date";
import { eq } from "drizzle-orm";
import { ArrowDown } from "lucide-react";

export default async function DepositHistory() {
  const session = await getCurrentSession();
  if (!session) {
    return <div>No user logged in</div>;
  }
  const [deposits, depositsCount] = await Promise.all([
    await db
      .select()
      .from(goalDeposits)
      .where(eq(goalDeposits.userId, session.user.id)),
    await db.$count(goalDeposits, eq(goalDeposits.userId, session.user.id)),
  ]);
  return (
    <div className="flex flex-col items-center justify-center mt-6">
      <div className="lg:w-3/5 border-b pb-3 flex items-center justify-between ">
        <h3 className="text-xl">Deposit history</h3>
        <p className="text-muted-foreground">
          {depositsCount} {depositsCount == 1 ? "deposit" : "deposits"}
        </p>
      </div>
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
                  {formatDate(deposit.createdAt)}
                </p>
              </div>
            </div>
            <p className="text-base text-success">+${deposit.amount}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
