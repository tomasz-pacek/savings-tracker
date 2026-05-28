import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import AddDepositForm from "./add-deposit-form";

export default function AddDepositCard() {
  return (
    <div className="flex items-center justify-center mt-6">
      <Card className="w-full lg:w-3/5">
        <CardHeader>
          <CardTitle>Add deposit</CardTitle>
        </CardHeader>
        <CardContent>
          <AddDepositForm />
        </CardContent>
      </Card>
    </div>
  );
}
