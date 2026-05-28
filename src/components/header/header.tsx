import { Plus } from "lucide-react";
import { getCurrentSession } from "@/lib/auth-utils";
import UserMenuClient from "./user-menu-client";
import CreateGoalButton from "@/components/shared/create-goal-button";

export default async function Header() {
  const session = await getCurrentSession();
  return (
    <header className="w-full py-4">
      <div className="container mx-auto">
        <div className="w-full flex items-center justify-between">
          <h1 className="text-xl">Savings Tracker</h1>
          <div className="flex items-center justify-center gap-x-2">
            {session ? (
              <CreateGoalButton className="rounded-full">
                <Plus />
                New goal
              </CreateGoalButton>
            ) : null}

            <UserMenuClient session={session} />
          </div>
        </div>
      </div>
    </header>
  );
}
