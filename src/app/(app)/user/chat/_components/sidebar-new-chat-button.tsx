"use client";

import ActionButton from "@/components/shared/action-button";
import {
  SidebarGroup,
  SidebarGroupContent,
  useSidebar,
} from "@/components/ui/sidebar";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";

export default function SidebarNewChatButton() {
  const router = useRouter();
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";
  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex items-center justify-center">
        <ActionButton
          className="w-full rounded-sm"
          onClick={() => router.push("/user/chat")}
        >
          <Plus className="size-4" />
          {!isCollapsed && "New chat"}
        </ActionButton>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
