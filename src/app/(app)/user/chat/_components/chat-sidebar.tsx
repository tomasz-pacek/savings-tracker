import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { getUserChats } from "@/db/queries";
import { getCurrentSession } from "@/lib/auth-utils";
import { redirect } from "next/navigation";
import SidebarNewChatButton from "./sidebar-new-chat-button";
import RecentChats from "./recent-chats";

export default async function ChatSidebar() {
  const session = await getCurrentSession();
  if (!session) return redirect("/login");

  const chats = await getUserChats(session.user.id);

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="flex flex-row items-center justify-between">
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
