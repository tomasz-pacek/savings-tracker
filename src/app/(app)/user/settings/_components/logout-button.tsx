"use client";

import ActionButton from "@/components/shared/action-button";
import { authClient } from "@/lib/auth-client";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await authClient.signOut();
      router.replace("/");
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <ActionButton onClick={handleLogout} className="w-full">
      <LogOut />
      Log out
    </ActionButton>
  );
}
