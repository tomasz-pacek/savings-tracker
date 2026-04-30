import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type Props = {
  children: React.ReactNode;
  cardTitle: string;
};

export default function CardWrapper({ children, cardTitle }: Props) {
  return (
    <Card className="mx-4 w-full max-w-md">
      <CardHeader className="text-center">
        <CardTitle className="text-xl">{cardTitle}</CardTitle>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
}
