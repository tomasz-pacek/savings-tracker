"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { BarChart, Bar, XAxis, CartesianGrid } from "recharts";

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
  const minWidth = graphData.length * 48;

  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle>Monthly deposits</CardTitle>
      </CardHeader>
      <CardContent className="px-2">
        <div className="w-full overflow-x-auto">
          <div style={{ minWidth }}>
            <ChartContainer config={chartConfig} className="h-32 w-full">
              <BarChart
                accessibilityLayer
                data={graphData}
                margin={{ left: 8, right: 8 }}
              >
                <CartesianGrid vertical={false} horizontal={false} />
                <XAxis
                  xAxisId="amount"
                  dataKey="total"
                  tickLine={false}
                  tickMargin={6}
                  axisLine={false}
                  tick={{ fill: "var(--muted-foreground)", fontSize: "0.7rem" }}
                  tickFormatter={(value) => `$${value}`}
                />
                <XAxis
                  xAxisId="month"
                  dataKey="month"
                  tickLine={false}
                  tickMargin={6}
                  axisLine={false}
                  tick={{ fill: "var(--foreground)", fontSize: "0.75rem" }}
                  interval={0}
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
                />
              </BarChart>
            </ChartContainer>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
