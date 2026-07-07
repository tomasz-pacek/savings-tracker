import HeaderServer from "@/components/header/header-server";

type Props = {
  children: React.ReactNode;
};

export default function UserLayout({ children }: Props) {
  return (
    <div className="flex min-h-screen flex-col">
      <HeaderServer />
      {children}
    </div>
  );
}
