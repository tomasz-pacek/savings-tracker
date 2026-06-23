"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { BarChart, Bar, XAxis, CartesianGrid, LabelList } from "recharts";

const chartConfig = {
  total: {
    label: "Amount",
    color: "var(--primary)",
  },
} satisfies ChartConfig;

type MonthlyDeposit = {
  month: string;
  total: number;
};

type Props = {
  graphData: MonthlyDeposit[];
};

export function MonthlyDepositsGraph({ graphData }: Props) {
  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle>Monthly deposits</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-32 w-full">
          <BarChart accessibilityLayer data={graphData}>
            <CartesianGrid vertical={false} horizontal={false} />
            <XAxis
              xAxisId="amount"
              dataKey="total"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tick={{ fill: "var(--muted-foreground)" }}
              tickFormatter={(value) => `$${value}`}
            />
            <XAxis
              xAxisId="month"
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tick={{ fill: "var(--foreground)", fontSize: "0.8rem" }}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  formatter={(value, name, item) =>
                    `${item.payload.month}: ${value}$`
                  }
                />
              }
            />
            <Bar
              xAxisId="month"
              dataKey="total"
              fill="var(--color-total)"
              radius={8}
            ></Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
