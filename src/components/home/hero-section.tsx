import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export function HeroSection() {
  return (
    <div className="w-full px-6 mt-24">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-balance mb-6">
          Reach your financial goals with the{" "}
          <span className="text-primary">Savings Tracker</span>
        </h1>

        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 text-balance">
          Set savings goals, track your progress, and manage your finances. Join
          the thousands of people who are already saving smarter.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button size="lg" className="px-8" asChild>
            <Link href="/register">
              Start saving
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>

          <Button size="lg" variant="outline" className="px-8" asChild>
            <Link href="/login">I already have an account</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
