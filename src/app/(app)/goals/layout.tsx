import Header from "@/components/header/header";

type Props = {
  children: React.ReactNode;
};

export default function GoalsLayout({ children }: Props) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      {children}
    </div>
  );
}
