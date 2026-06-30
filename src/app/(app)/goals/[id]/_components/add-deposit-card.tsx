import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import AddDepositForm from "./add-deposit-form";
import { Goal } from "@/db/schema";

type Props = {
  userGoal: Goal;
};

export default function AddDepositCard({ userGoal }: Props) {
  return (
    <div className="mt-6 flex items-center justify-center px-4">
      <Card className="w-full px-4 py-6 lg:w-3/5">
        <CardHeader>
          <CardTitle className="text-xl">Add deposit</CardTitle>
        </CardHeader>
        <CardContent>
          <AddDepositForm userGoal={userGoal} />
        </CardContent>
      </Card>
    </div>
  );
}
