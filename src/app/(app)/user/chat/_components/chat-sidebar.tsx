import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import CreateChatButton from "./create-chat-button";
import { db } from "@/db";
import { chat } from "@/db/schema";
import { eq } from "drizzle-orm";
import { getCurrentSession } from "@/lib/auth-utils";
import UserChatHistory from "./user-chat-history";

export async function ChatSidebar() {
  const session = await getCurrentSession();
  if (!session) return { success: false, message: "Unathorized" };

  const userChats = await db
    .select()
    .from(chat)
    .where(eq(chat.userId, session.user.id));
  return (
    <div className="relative">
      <SidebarTrigger className="absolute top-1.5 left-1 z-1000" />
      <Sidebar>
        <SidebarHeader className="text-center">
          Savings Tracker Chat
        </SidebarHeader>
        <SidebarContent>
          <CreateChatButton />
          <UserChatHistory userChats={userChats} />
        </SidebarContent>
        <SidebarFooter />
      </Sidebar>
    </div>
  );
}
