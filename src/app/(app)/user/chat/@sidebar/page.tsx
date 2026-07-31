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
import { desc, eq, and, ilike } from "drizzle-orm";
import { notFound } from "next/navigation";
import SidebarNewChatButton from "../_components/sidebar-new-chat-button";
import SidebarChatSearch from "../_components/sidebar-chat-search";
import RecentChats from "../_components/recent-chats";

type Props = {
  searchParams: Promise<{ chatSearch?: string }>;
};

export default async function ChatSidebar({ searchParams }: Props) {
  const session = await getCurrentSession();
  if (!session) return notFound();
  const userId = session.user.id;

  const params = (await searchParams) || {};
  const chatSearch = params.chatSearch ?? "";

  const chats = await db
    .select()
    .from(chat)
    .where(and(eq(chat.userId, userId), ilike(chat.title, `%${chatSearch}%`)))
    .orderBy(desc(chat.createdAt));
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="flex flex-row items-center justify-between">
        {/* <p>Savings Tracker</p> */}
        <SidebarTrigger />
      </SidebarHeader>
      <SidebarContent>
        <SidebarNewChatButton />
        <SidebarChatSearch />
        <RecentChats chats={chats} />
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}
