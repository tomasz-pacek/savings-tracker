import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { ChatSidebar } from "./_components/chat-sidebar";

export default function ChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <ChatSidebar />
      <main className="flex-1">{children}</main>
    </SidebarProvider>
  );
}
