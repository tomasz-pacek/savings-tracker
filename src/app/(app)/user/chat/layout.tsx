import { SidebarProvider } from "@/components/ui/sidebar";
import ChatSidebar from "./_components/chat-sidebar";

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  return (
    <SidebarProvider>
      <ChatSidebar />
      <main className="flex w-full flex-1 flex-col items-center justify-center">
        {children}
      </main>
    </SidebarProvider>
  );
}
