"use client";

import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@highschool/ui/components/ui/card";
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
} from "@highschool/ui/components/ui/chart";
import { FSRSParameter } from "@highschool/interfaces";

interface RetrievabilityGraphProps {
    parameters: FSRSParameter[];
    time?: number;
}

const chartConfig = {
    retrievability: {
        label: "retrievability",
        color: "hsl(var(--chart-1))",
    },
} satisfies ChartConfig;

export const RetrievabilityGraph = ({
    parameters,
    time,
}: RetrievabilityGraphProps) => {
    const calculateRetrievability = (time: number) => {
        return parameters.reduce(
            (acc, param, i) => acc + param.value * Math.exp(-0.1 * (i + 1) * time),
            0,
        );
    };

    const data = Array.from({ length: time ?? 7 }, (_, i) => ({
        time: i,
        retrievability: calculateRetrievability(i),
    }));

    return (
        <Card>
            <CardHeader>
                <CardTitle>Preview</CardTitle>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig}>
                    <LineChart
                        accessibilityLayer
                        data={data}
                        margin={{ left: 12, right: 12 }}
                    >
                        <CartesianGrid vertical={false} />
                        <XAxis
                            axisLine={false}
                            dataKey="time"
                            height={40}
                            label={{
                                value: "Time (Days)",
                                position: "insideBottom",
                                offset: 3,
                            }}
                            tickLine={true}
                            tickMargin={5}
                        />
                        <YAxis
                            axisLine={false}
                            domain={[0, 1]}
                            label={{
                                value: "Retrievability",
                                angle: -90,
                                position: "insideLeft",
                            }}
                            tickFormatter={(value) => `${value.toFixed(0)}%`}
                            tickLine={true}
                        />
                        <ChartTooltip
                            content={({ active, payload }) => {
                                if (active && payload && payload.length) {
                                    const data = payload[0].payload;

                                    return (
                                        <div className="bg-background rounded-lg border p-2 shadow-sm">
                                            <div className="grid grid-cols-2 gap-2">
                                                <div className="flex flex-col">
                                                    <span className="text-muted-foreground text-[0.70rem]">
                                                        Retrievability
                                                    </span>
                                                    <span className="text-xs font-bold">
                                                        {data.retrievability.toFixed(2)} %
                                                    </span>
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="text-muted-foreground text-[0.70rem]">
                                                        Day
                                                    </span>
                                                    <span className="text-xs font-bold">{data.time}</span>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                }
                            }}
                            cursor={false}
                        />
                        <Line
                            dataKey="retrievability"
                            dot={{ r: 3 }}
                            stroke="var(--color-retrievability)"
                            strokeWidth={2}
                            type="monotone"
                        />
                    </LineChart>
                </ChartContainer>
            </CardContent>
        </Card>
    );
};
