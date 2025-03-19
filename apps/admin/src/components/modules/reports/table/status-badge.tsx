import { Badge } from "@highschool/ui/components/ui/badge";
import {
    IconAlertCircle,
    IconCheck,
    IconClock,
    IconX,
} from "@tabler/icons-react";

export const StatusBadge = ({ status }: { status: string }) => {
    switch (status) {
        case "New":
            return (
                <Badge
                    className="border-blue-200 bg-blue-50 text-blue-600"
                    variant="outline"
                >
                    <IconClock className="mr-1 size-3" /> New
                </Badge>
            );
        case "In Progress":
            return (
                <Badge
                    className="border-yellow-200 bg-yellow-50 text-yellow-600"
                    variant="outline"
                >
                    <IconAlertCircle className="mr-1 size-3" /> In Progress
                </Badge>
            );
        case "Resolved":
            return (
                <Badge
                    className="border-green-200 bg-green-50 text-green-600"
                    variant="outline"
                >
                    <IconCheck className="mr-1 size-3" /> Resolved
                </Badge>
            );
        case "Rejected":
            return (
                <Badge
                    className="border-red-200 bg-red-50 text-red-600"
                    variant="outline"
                >
                    <IconX className="mr-1 size-3" /> Rejected
                </Badge>
            );
        default:
            return <Badge variant="outline">{status}</Badge>;
    }
};
