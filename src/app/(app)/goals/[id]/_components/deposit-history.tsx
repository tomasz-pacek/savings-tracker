import { getUserDeposits } from "@/db/queries";
import { getCurrentSession } from "@/lib/auth-utils";
import { formatTimestampDate } from "@/lib/format-timestamp-date";
import { ArrowDown } from "lucide-react";
import { redirect } from "next/navigation";

type Props = {
  goalId: string;
};

export default async function DepositHistory({ goalId }: Props) {
  const session = await getCurrentSession();

  if (!session) redirect("/login");

  const deposits = await getUserDeposits(session.user.id, goalId);

  return (
    <div className="mt-6 flex flex-col items-center justify-center">
      <div className="flex w-full items-center justify-between border-b px-4 pb-3 lg:w-3/5">
        <h3 className="text-xl">Deposit history</h3>
        <p className="text-muted-foreground">
          {deposits.length} {deposits.length == 1 ? "deposit" : "deposits"}
        </p>
      </div>
      {deposits.length !== 0 ? (
        <div className="my-4 flex w-full flex-col items-center justify-center gap-4 px-4 lg:w-3/5">
          {deposits.map((deposit) => (
            <div
              key={deposit.id}
              className="flex w-full items-center justify-between"
            >
              <div className="flex items-center justify-center gap-2">
                <div className="bg-muted-foreground/15 rounded-full p-2">
                  <ArrowDown />
                </div>
                <div className="flex flex-col items-start justify-center gap-1">
                  {deposit.description && (
                    <p className="text-sm">{deposit.description}</p>
                  )}
                  <p className="text-muted-foreground text-sm">
                    {formatTimestampDate(deposit.createdAt)}
                  </p>
                </div>
              </div>
              <p className="text-success text-base">+${deposit.amount}</p>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-muted-foreground my-6">
          You don&apos;t have any deposits yet.
        </div>
      )}
    </div>
  );
}
