import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { db } from "@/db";
import { chat } from "@/db/schema";
import { getCurrentSession } from "@/lib/auth-utils";
import { desc, eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import SidebarNewChatButton from "./sidebar-new-chat-button";
import RecentChats from "./recent-chats";

export async function ChatSidebar() {
  const session = await getCurrentSession();
  if (!session) return notFound();
  const userId = session.user.id;
  const chats = await db
    .select()
    .from(chat)
    .where(eq(chat.userId, userId))
    .orderBy(desc(chat.createdAt));
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="flex flex-row items-center justify-between">
        {/* <p>Savings Tracker</p> */}
        <SidebarTrigger />
      </SidebarHeader>
      <SidebarContent>
        <SidebarNewChatButton />
        <RecentChats chats={chats} />
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}
