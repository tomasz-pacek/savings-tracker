"use client";

import { LogOut, Settings, User } from "lucide-react";

import { Session } from "@/types/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type Props = {
  session: Session;
  variant?: "desktop" | "mobile";
};

export default function UserMenuClient({
  session,
  variant = "desktop",
}: Props) {
  const router = useRouter();
  const isMobile = variant === "mobile";

  const handleLogout = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/");
          router.refresh();
        },
        onError: (ctx) => {
          toast(ctx.error.message);
        },
      },
    });
  };

  if (!session) {
    return (
      <Link
        className={cn(
          "bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-4 py-1 text-sm font-medium transition-colors",
          isMobile && "w-full",
        )}
        href="/login"
      >
        Login
      </Link>
    );
  }

  // On mobile, show a labeled, full-width row instead of a bare icon.
  if (isMobile) {
    return (
      <div className="flex flex-col gap-1">
        <button
          type="button"
          onClick={() => router.push("/user/settings")}
          className="text-muted-foreground hover:bg-muted hover:text-foreground flex items-center gap-2 rounded-md px-3 py-2.5 text-sm font-medium transition-colors"
        >
          <Settings className="size-4" /> Settings
        </button>
        <button
          type="button"
          onClick={handleLogout}
          className="text-muted-foreground hover:bg-muted hover:text-foreground flex items-center gap-2 rounded-md px-3 py-2.5 text-sm font-medium transition-colors"
        >
          <LogOut className="size-4" /> Log out
        </button>
      </div>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="focus-visible:ring-ring cursor-pointer rounded-full outline-none focus-visible:ring-2 focus-visible:ring-offset-2">
        <div className="bg-primary text-primary-foreground flex size-8 items-center justify-center rounded-full">
          <User size={20} aria-hidden="true" />
        </div>
        <span className="sr-only">Open user menu</span>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-42">
        <DropdownMenuLabel className="text-foreground truncate text-sm">
          {session.user.name}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="cursor-pointer"
          onClick={() => router.push("/user/settings")}
        >
          <Settings /> Settings
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer" onClick={handleLogout}>
          <LogOut /> Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
