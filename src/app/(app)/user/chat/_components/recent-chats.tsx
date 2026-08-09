"use client";

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { Chat } from "@/db/schema";
import { MessageCircle } from "lucide-react";
import { Route } from "next";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useMemo, useState } from "react";
import SidebarChatSearch from "./sidebar-chat-search";
import { useDebounce } from "@/hooks/use-debounce";

type Props = {
  chats: Chat[];
};

export default function RecentChats({ chats }: Props) {
  const { state, toggleSidebar } = useSidebar();
  const isCollapsed = state === "collapsed";
  const params = useParams();
  const { chatId } = params;

  const [search, setSearch] = useState<string>("");
  const debouncedSearch = useDebounce(search, 300);

  const filteredChats = useMemo(() => {
    const query = debouncedSearch.trim().toLowerCase();
    if (!query) return chats;
    return chats.filter((chat) => chat.title.toLowerCase().includes(query));
  }, [chats, debouncedSearch]);

  return (
    <>
      <SidebarChatSearch search={search} setSearch={setSearch} />
      {isCollapsed ? (
        <SidebarGroup>
          <SidebarGroupContent onClick={() => toggleSidebar()}>
            <SidebarMenuButton className="cursor-pointer" asChild>
              <MessageCircle className="size-5" />
            </SidebarMenuButton>
          </SidebarGroupContent>
        </SidebarGroup>
      ) : (
        <SidebarGroup className="overflow-y-auto">
          {/* <SidebarGroupLabel>
        {chatSearch?.length > 0 ? "SEARCH" : "RECENT"}
      </SidebarGroupLabel> */}
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {filteredChats.map((chat) => (
                <SidebarMenuItem key={chat.id}>
                  <SidebarMenuButton asChild isActive={chat.id === chatId}>
                    <Link href={`/user/chat/${chat.id}` as Route}>
                      <span className="truncate">{chat.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      )}
    </>
  );
}
