import DashboardContent from "@/app/(feautres)/dashboard/components/dashboard-content";
import Header from "@/components/header/header";
import { HeroSection } from "@/components/home/hero-section";
import { getCurrentSession } from "@/lib/auth-utils";

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
