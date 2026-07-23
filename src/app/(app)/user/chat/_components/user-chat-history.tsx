"use client";

import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { UserChat } from "@/db/schema";
import { useRouter } from "next/navigation";

type Props = {
  userChats: UserChat[];
};

export default function UserChatHistory({ userChats }: Props) {
  const router = useRouter();
  return (
    <>
      {userChats.map((chat) => (
        <SidebarGroup key={chat.id}>
          <SidebarMenu
            className="hover:bg-sidebar/50 cursor-pointer"
            onClick={() => router.push(`/user/chat/${chat.id}`)}
          >
            <SidebarMenuItem>{chat.title}</SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      ))}
    </>
  );
}
