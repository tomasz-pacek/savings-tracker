import CreateGoalButton from "@/components/shared/create-goal-button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Empty,
  EmptyHeader,
  EmptyTitle,
  EmptyDescription,
  EmptyContent,
} from "@/components/ui/empty";
import { Plus } from "lucide-react";

export default function EmptyDashboard() {
  return (
    <div className="flex min-h-screen w-full flex-col">
      {/* Empty State Content */}
      <main className="flex-1 p-6">
        <div className="mx-auto max-w-6xl">
          {/* Stats Cards - Empty */}
          <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-3">
            <Card className="bg-primary text-primary-foreground border-0">
              <CardContent className="flex h-full flex-col justify-between gap-4">
                <p className="mb-1 text-sm font-medium">Total savings</p>
                <p className="text-4xl font-bold">0,00 $</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="flex h-full flex-col justify-between gap-4">
                <p className="mb-1 text-sm font-medium">Active goals</p>
                <p className="text-primary text-4xl font-bold">0</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="flex h-full flex-col justify-between gap-4">
                <p className="mb-1 text-sm font-medium">Goals completed </p>
                <p className="text-success text-4xl font-bold">0</p>
              </CardContent>
            </Card>
          </div>

          {/* Main Empty State */}
          <Card className="border-dashed">
            <CardContent className="py-16">
              <Empty className="border-0">
                <EmptyHeader>
                  <EmptyTitle className="text-lg">
                    Start your journey with saving
                  </EmptyTitle>
                  <EmptyDescription>
                    You don&apos;t have any goals yet. Create your first goal
                    and start tracking your progress!
                  </EmptyDescription>
                </EmptyHeader>
                <EmptyContent>
                  <CreateGoalButton>
                    <Plus />
                    Create new goal
                  </CreateGoalButton>
                </EmptyContent>
              </Empty>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
