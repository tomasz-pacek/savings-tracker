"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Menu, X, Plus, Target } from "lucide-react";
import Link from "next/link";
import { Route } from "next";
import UserMenuClient from "./user-menu-client";
import CreateGoalButton from "../shared/create-goal-button";
import { Session } from "@/types/auth";

type NavLink = {
  label: string;
  href: Route;
};

const navLinks: NavLink[] = [
  { label: "Home", href: "/" as Route },
  { label: "Goals", href: "/goals" as Route },
];

type Props = {
  session: Session;
};

export default function HeaderClient({ session }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <header className="border-border bg-background/80 sticky top-0 z-50 w-full border-b backdrop-blur-md">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4">
        {/* Left: brand + desktop links */}
        <div className="flex min-w-0 items-center gap-6">
          <Link
            href={"/" as Route}
            className="text-foreground flex shrink-0 items-center gap-2 font-semibold"
          >
            <span className="bg-primary text-primary-foreground flex h-8 w-8 items-center justify-center rounded-md">
              <Target className="size-5" aria-hidden="true" />
            </span>
            <span className="truncate text-lg">Savings Tracker</span>
          </Link>

          <ul className="hidden items-center gap-1 md:flex">
            {navLinks.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className="text-muted-foreground hover:bg-muted hover:text-foreground rounded-md px-3 py-2 text-sm font-medium transition-colors"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Right: desktop actions */}
        <div className="hidden items-center gap-2 md:flex">
          {session ? (
            <CreateGoalButton className="rounded-full">
              <Plus className="size-4" />
              <span>New goal</span>
            </CreateGoalButton>
          ) : null}
          <UserMenuClient session={session} />
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="text-foreground hover:bg-muted inline-flex size-10 shrink-0 items-center justify-center rounded-md transition-colors md:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          <AnimatePresence initial={false} mode="wait">
            {open ? (
              <motion.span
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.15 }}
              >
                <X className="size-5" aria-hidden="true" />
              </motion.span>
            ) : (
              <motion.span
                key="open"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.15 }}
              >
                <Menu className="size-5" aria-hidden="true" />
              </motion.span>
            )}
          </AnimatePresence>
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="border-border overflow-hidden border-t md:hidden"
          >
            <div className="mx-auto flex flex-col gap-1 px-4 py-4">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.label}
                  initial={{ x: -12, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.05 * i, duration: 0.2 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="text-muted-foreground hover:bg-muted hover:text-foreground block rounded-md px-3 py-2.5 text-sm font-medium transition-colors"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}

              <div className="border-border mt-3 flex flex-col gap-2 border-t pt-3">
                {session ? (
                  <CreateGoalButton className="w-full justify-center rounded-full">
                    <Plus className="size-4" />
                    <span>New goal</span>
                  </CreateGoalButton>
                ) : null}
                <UserMenuClient session={session} variant="mobile" />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
