import DashboardContent from "@/components/dashboard/dashboard-content";
import { HeroSection } from "@/components/home/hero-section";
import { getCurrentSession } from "@/lib/auth-utils";
import Header from "./feautres/header/components/header";

export default async function Home() {
  const session = await getCurrentSession();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="container mx-auto flex flex-col items-start justify-center">
        {session ? <DashboardContent /> : <HeroSection />}
      </main>
    </div>
  );
}
