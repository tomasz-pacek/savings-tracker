"use client";

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { Chat } from "@/db/schema";
import { MessageCircle } from "lucide-react";
import { Route } from "next";
import Link from "next/link";
import { usePathname } from "next/navigation";

type Props = {
  chats: Chat[];
};

export default function RecentChats({ chats }: Props) {
  const { state, toggleSidebar } = useSidebar();
  const pathname = usePathname();
  const activeChatId = pathname.startsWith("/user/chat/")
    ? pathname.split("/user/chat/")[1]
    : null;

  if (state === "collapsed") {
    return (
      <SidebarGroup>
        <SidebarGroupContent onClick={() => toggleSidebar()}>
          <SidebarMenuButton className="cursor-pointer" asChild>
            <MessageCircle className="size-5" />
          </SidebarMenuButton>
        </SidebarGroupContent>
      </SidebarGroup>
    );
  }

  return (
    <SidebarGroup className="overflow-y-auto">
      <SidebarGroupLabel>RECENT</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu className="space-y-1">
          {chats.map((chat) => (
            <SidebarMenuItem key={chat.id}>
              <SidebarMenuButton asChild isActive={chat.id === activeChatId}>
                <Link href={`/user/chat/${chat.id}` as Route}>
                  <span className="truncate">{chat.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
