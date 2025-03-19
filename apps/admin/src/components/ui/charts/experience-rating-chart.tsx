import {
    CartesianGrid,
    ResponsiveContainer,
    Scatter,
    ScatterChart,
    XAxis,
    YAxis,
    ZAxis,
} from "recharts";
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@highschool/ui/components/ui/chart";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@highschool/ui/components/ui/card";

export const ExperienceRatingChart = () => {
    const data = [
        { experience: 1, rating: 1.2, count: 12 },
        { experience: 2, rating: 3.5, count: 15 },
        { experience: 3, rating: 4.7, count: 18 },
        { experience: 4, rating: 0.9, count: 22 },
        { experience: 5, rating: 4.0, count: 25 },
        { experience: 6, rating: 1.1, count: 20 },
        { experience: 7, rating: 4.2, count: 18 },
        { experience: 8, rating: 2.3, count: 15 },
        { experience: 9, rating: 4.4, count: 12 },
        { experience: 10, rating: 5.0, count: 10 },
        { experience: 11, rating: 4.6, count: 8 },
        { experience: 12, rating: 1.6, count: 7 },
        { experience: 13, rating: 3.7, count: 5 },
        { experience: 14, rating: 4.7, count: 4 },
        { experience: 15, rating: 4.8, count: 3 },
        { experience: 16, rating: 4.8, count: 2 },
        { experience: 17, rating: 4.9, count: 2 },
        { experience: 18, rating: 4.9, count: 1 },
        { experience: 19, rating: 5.0, count: 1 },
        { experience: 20, rating: 5.0, count: 1 },
        { experience: 21, rating: 3.2, count: 12 },
        { experience: 22, rating: 3.5, count: 15 },
        { experience: 23, rating: 3.7, count: 18 },
        { experience: 24, rating: 3.9, count: 22 },
        { experience: 25, rating: 4.0, count: 25 },
        { experience: 26, rating: 4.1, count: 20 },
        { experience: 27, rating: 4.2, count: 18 },
        { experience: 28, rating: 4.3, count: 15 },
        { experience: 29, rating: 4.4, count: 12 },
        { experience: 30, rating: 4.5, count: 10 },
        { experience: 31, rating: 4.6, count: 8 },
        { experience: 32, rating: 4.6, count: 7 },
        { experience: 33, rating: 4.7, count: 5 },
        { experience: 34, rating: 4.7, count: 4 },
        { experience: 35, rating: 4.8, count: 3 },
        { experience: 36, rating: 4.8, count: 2 },
        { experience: 37, rating: 4.9, count: 2 },
        { experience: 38, rating: 4.9, count: 1 },
        { experience: 39, rating: 5.0, count: 1 },
        { experience: 40, rating: 5.0, count: 1 },
    ];

    return (
        <Card>
            <CardHeader>
                <CardTitle>Experience vs. Rating</CardTitle>
                <CardDescription>
                    Correlation between experience and teacher ratings
                </CardDescription>
            </CardHeader>
            <CardContent className="h-[50vh]">
                <ResponsiveContainer>
                    <ChartContainer
                        className="h-[350px]"
                        config={{
                            count: {
                                label: "Teachers",
                                color: "hsl(var(--chart-1))",
                            },
                        }}
                    >
                        <ScatterChart
                            accessibilityLayer
                            margin={{
                                top: 20,
                                right: 20,
                                bottom: 20,
                                left: 20,
                            }}
                        >
                            <CartesianGrid />
                            <XAxis
                                dataKey="experience"
                                domain={[0, 20]}
                                label={{
                                    value: "Years of Experience",
                                    position: "insideBottom",
                                    offset: -5,
                                }}
                                name="Experience"
                                type="number"
                            />
                            <YAxis
                                dataKey="rating"
                                domain={[3, 5]}
                                label={{ value: "Rating", angle: -90, position: "insideLeft" }}
                                name="Rating"
                                type="number"
                            />
                            <ZAxis dataKey="count" range={[50, 400]} type="number" />
                            <ChartTooltip
                                content={<ChartTooltipContent />}
                                cursor={{ strokeDasharray: "3 3" }}
                            />
                            <Scatter data={data} fill="var(--color-count)" name="Teachers" />
                        </ScatterChart>
                    </ChartContainer>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    );
};
