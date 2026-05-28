import { Card, CardContent } from "@/components/ui/card";

type Props = {
  goalsCount: number;
};

export default function DashboardStats({ goalsCount }: Props) {
  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
      <Card className="bg-primary text-primary-foreground border-0 sm:col-span-2">
        <CardContent className="flex flex-col justify-between h-full gap-4">
          <p className="text-sm mb-1 font-medium">Total savings</p>
          <p className="text-4xl font-bold">0,00 zł</p>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="flex flex-col justify-between h-full gap-4">
          <p className="text-sm mb-1 font-medium">Active goals</p>
          <p className="text-4xl font-bold text-primary">{goalsCount}</p>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="flex flex-col justify-between h-full gap-4">
          <p className="text-sm mb-1 font-medium">Goals completed</p>
          <p className="text-4xl font-bold text-success">0</p>
        </CardContent>
      </Card>
    </div>
  );
}
