import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@highschool/ui/components/ui/accordion";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@highschool/ui/components/ui/card";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@highschool/ui/components/ui/table";
import { IconLink } from "@tabler/icons-react";
import { Badge } from "@highschool/ui/components/ui/badge";

import {
    categoryConfig,
    defaultParameters,
    impactConfig,
} from "@/domain/constants/fsrs-constant";

function InformationModule() {
    const references: Record<string, string> = {
        Anki: "https://apps.ankiweb.net/docs/manual.html#srs",
        SuperMemo: "https://www.supermemo.com/en/archives1990-2015/english/ol/srs",
    };

    return (
        <Card className="mt-4">
            <CardHeader>
                <CardTitle className="text-primary mb-0 pb-0 text-2xl">
                    About FSRS (Free Spaced Repetition Scheduler)
                </CardTitle>
                <CardDescription className="text-lg text-gray-400">
                    Understanding the algorithm and its parameters
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div>
                    <h3 className="mb-2 text-lg font-medium">What is FSRS?</h3>
                    <p className="text-muted-foreground">
                        Free Spaced Repetition Scheduler (FSRS) is an algorithm that
                        optimizes the scheduling of review sessions to improve long-term
                        memory retention. The algorithm uses a mathematical model of memory
                        to predict when you&apos;re likely to forget information and
                        schedules reviews just before that happens.
                    </p>

                    <Accordion collapsible className="w-full" type="single">
                        <AccordionItem value="knowledge">
                            <AccordionTrigger className="gap-2">
                                <div className="flex items-center gap-2 font-bold">
                                    <IconLink className="size-4" />
                                    References
                                </div>
                            </AccordionTrigger>
                            <AccordionContent className="space-y-2">
                                {Object.entries(references).map(([key, value], index) => (
                                    <div key={index} className="space-y-2">
                                        <a href={value}>
                                            {index + 1}. {key}
                                        </a>
                                    </div>
                                ))}
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </div>

                <div>
                    <h3 className="mb-2 text-lg font-medium">Parameter Categories</h3>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                        {Object.entries(categoryConfig).map(([key, value], index) => (
                            <Card key={index} className="hover:bg-[]">
                                <CardHeader className="pb-2">
                                    <CardTitle className="flex items-center gap-2 text-base">
                                        {value.icon} {value.title}
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-muted-foreground text-sm">
                                        {value.description}
                                    </p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>

                <div>
                    <h3 className="mb-2 text-lg font-medium">Parameter Descriptions</h3>
                    <div className="overflow-hidden rounded-md border">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Parameter</TableHead>
                                    <TableHead>Description</TableHead>
                                    <TableHead>Category</TableHead>
                                    <TableHead>Impact</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {defaultParameters.map((param, index) => {
                                    const category = categoryConfig[param.category];
                                    const impact = impactConfig[param.impact];

                                    return (
                                        <TableRow key={index}>
                                            <TableCell className="font-medium">
                                                {param.name}
                                            </TableCell>
                                            <TableCell>{param.description}</TableCell>
                                            <TableCell>
                                                <Badge className={category.textColor} variant="outline">
                                                    {category.title}
                                                </Badge>
                                            </TableCell>
                                            <TableCell>
                                                <Badge className={impact.textColor} variant="outline">
                                                    {impact.label}
                                                </Badge>
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}

export default InformationModule;
