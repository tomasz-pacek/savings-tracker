import { SidebarProvider } from "@/components/ui/sidebar";

type Props = {
  children: React.ReactNode;
  sidebar: React.ReactNode;
};

export default function Layout({ children, sidebar }: Props) {
  return (
    <SidebarProvider>
      {sidebar}
      <main className="flex w-full flex-1 flex-col items-center justify-center">
        {children}
      </main>
    </SidebarProvider>
  );
}
