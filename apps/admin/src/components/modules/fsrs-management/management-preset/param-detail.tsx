import { Badge } from "@highschool/ui/components/ui/badge";
import { ScrollArea } from "@highschool/ui/components/ui/scroll-area";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@highschool/ui/components/ui/table";

import {
    categoryConfig,
    defaultParameters,
    impactConfig,
} from "@/domain/constants/fsrs-constant";

interface ParameterDetailProps {
    params: number[];
}

export const ParamDetail = ({ params }: ParameterDetailProps) => {
    return (
        <ScrollArea className="h-[35vh] rounded-md border">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Parameter</TableHead>
                        <TableHead>Value</TableHead>
                        <TableHead className="hidden md:table-cell">Category</TableHead>
                        <TableHead className="hidden md:table-cell">Impact</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {params.map((value, index) => {
                        const param = defaultParameters[index];

                        return (
                            <TableRow key={index}>
                                <TableCell>
                                    <div className="font-medium">{param.name}</div>
                                </TableCell>
                                <TableCell>
                                    <div className="flex items-center gap-2">
                                        <span className="font-medium">{value.toFixed(4)}</span>
                                    </div>
                                </TableCell>
                                <TableCell className="hidden md:table-cell">
                                    <Badge
                                        className={categoryConfig[param.category].textColor}
                                        variant="outline"
                                    >
                                        {param.category}
                                    </Badge>
                                </TableCell>
                                <TableCell className="hidden md:table-cell">
                                    <Badge
                                        className={impactConfig[param.impact].textColor}
                                        variant="outline"
                                    >
                                        {param.impact}
                                    </Badge>
                                </TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </ScrollArea>
    );
};
