import { Card, CardContent } from "@/components/ui/card";
import {
  Empty,
  EmptyHeader,
  EmptyTitle,
  EmptyDescription,
  EmptyContent,
} from "@/components/ui/empty";
import { Plus } from "lucide-react";
import { Button } from "../ui/button";
import ActionButton from "../action-button";
import CreateGoalButton from "./create-goal-button";

export function EmptyDashboard() {
  return (
    <div className="min-h-screen flex flex-col w-full">
      {/* Empty State Content */}
      <main className="flex-1 p-6">
        <div className="max-w-4xl mx-auto">
          {/* Stats Cards - Empty */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <Card className="bg-primary text-primary-foreground border-0">
              <CardContent className="pt-4">
                <p className="text-sm mb-1 font-medium">Total savings</p>
                <p className="text-4xl font-bold">0,00 zł</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-4">
                <p className="text-sm mb-1 font-medium">Active goals</p>
                <p className="text-4xl font-bold text-primary">0</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-4">
                <p className="text-sm mb-1 font-medium">Finished goals</p>
                <p className="text-4xl font-bold text-primary">0</p>
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
                  <CreateGoalButton />
                </EmptyContent>
              </Empty>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
