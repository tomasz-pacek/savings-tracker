import { Plus, Target } from "lucide-react";
import { getCurrentSession } from "@/lib/auth-utils";
import UserMenuClient from "./user-menu-client";
import CreateGoalButton from "@/components/shared/create-goal-button";
import Link from "next/link";
import { Route } from "next";

export default async function Header() {
  const session = await getCurrentSession();

  const NAV_LINKS: { name: string; href: Route }[] = [
    { name: "Home", href: "/" },
    { name: "Goals", href: "/goals" },
  ];

  return (
    <header className="border-border/60 bg-background/80 supports-backdrop-filter:bg-background/60 sticky top-0 z-50 w-full border-b backdrop-blur">
      <div className="container mx-auto flex h-16 items-center justify-between gap-4 px-4">
        <div className="flex items-center gap-6">
          <Link
            href="/"
            className="flex items-center gap-2 text-base font-semibold tracking-tight"
          >
            <span className="bg-primary text-primary-foreground flex h-8 w-8 items-center justify-center rounded-lg">
              <Target className="h-4 w-4" />
            </span>
            <span>Savings Tracker</span>
          </Link>

          <nav className="hidden items-center gap-1 sm:flex">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-muted-foreground hover:bg-muted hover:text-foreground rounded-md px-3 py-2 text-sm font-medium transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </nav>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          {session ? (
            <CreateGoalButton className="rounded-full">
              <Plus className="h-4 w-4" />
              <span className="hidden sm:inline">New goal</span>
            </CreateGoalButton>
          ) : null}

          <UserMenuClient session={session} />
        </div>
      </div>
    </header>
  );
}
