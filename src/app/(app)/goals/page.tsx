import { db } from "@/db";
import { goal } from "@/db/schema";
import { getCurrentSession } from "@/lib/auth-utils";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import GoalsView from "./_components/goals-view";

export default async function GoalsPage() {
  const session = await getCurrentSession();

  if (!session) redirect("/login");

  const userId = session.user.id;

  const goals = await db.select().from(goal).where(eq(goal.userId, userId));

  return (
    <main className="container mx-auto">
      <GoalsView goals={goals} />
    </main>
  );
}
