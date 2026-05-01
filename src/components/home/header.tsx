import { Plus } from "lucide-react";
import { Button } from "../ui/button";
import { getCurrentSession } from "@/lib/auth-utils";
import UserMenuClient from "./user-menu-client";

export default async function Header() {
  const session = await getCurrentSession();
  return (
    <header className="w-full border-b border-b-muted-foreground py-4">
      <div className="container mx-auto">
        <div className="w-full flex items-center justify-between">
          <h1 className="text-xl">Savings Tracker</h1>
          <div className="flex items-center justify-center gap-x-2">
            {session ? (
              <Button className="rounded-full px-4 py-1.5 text-sm font-normal">
                <Plus />
                New goal
              </Button>
            ) : null}

            <UserMenuClient session={session} />
          </div>
        </div>
      </div>
    </header>
  );
}
