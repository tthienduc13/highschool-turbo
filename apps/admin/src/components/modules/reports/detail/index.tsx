"use client";

import { useState } from "react";
import Image from "next/image";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@highschool/ui/components/ui/card";
import { Badge } from "@highschool/ui/components/ui/badge";
import { Separator } from "@highschool/ui/components/ui/separator";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@highschool/ui/components/ui/dialog";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@highschool/ui/components/ui/select";
import { Textarea } from "@highschool/ui/components/ui/textarea";
import { toast } from "sonner";
import {
    IconAlertCircle,
    IconCalendar,
    IconCheck,
    IconClock,
    IconMail,
    IconUser,
    IconX,
} from "@tabler/icons-react";
import { Button } from "@highschool/ui/components/ui/button";

// Status badge component
const StatusBadge = ({ status }: { status: string }) => {
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

export default function ReportDetailModule({ id }: { id: string }) {
    const [status, setStatus] = useState("New");
    const [imageDialogOpen, setImageDialogOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState("");
    const [note, setNote] = useState("");

    // Mock report data - in a real app, you would fetch this based on the ID
    const report = {
        id: id,
        reportTitle: "Inappropriate Content",
        reportContent:
            "I found inappropriate content in the forum section. A user posted offensive material that violates community guidelines. Please review and take action as soon as possible.",
        status: "New",
        userId: "01955b94-3dca-74d8-4211-e36701ddb7ec",
        fullName: "John Smith",
        email: "john.smith@example.com",
        createdAt: "2025-03-19T13:21:35.675084",
        imageReports: [
            "http://res.cloudinary.com/dhdyel6be/image/upload/v1742390497/HighSchool/reports/f0bebc0a-e6f5-4429-9d56-890dcaba8c39%40638779872957167397..jpg.jpg",
        ],
    };

    const handleStatusChange = (newStatus: string) => {
        setStatus(newStatus);
        toast.success(`Report status changed to ${newStatus}`);
    };

    const handleImageClick = (imageUrl: string) => {
        setSelectedImage(imageUrl);
        setImageDialogOpen(true);
    };

    const handleSaveNote = () => {
        if (note.trim()) {
            toast.success("Your note has been saved successfully");
        } else {
            toast.error("Please enter a note before saving");
        }
    };

    return (
        <div>
            <div className="flex-1 space-y-4 overflow-auto p-2 md:py-4">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-primary mb-0 pb-0 text-2xl font-bold">
                            Report Detail
                        </p>
                        <span className="text-lg text-gray-400">{report.id}</span>
                    </div>
                    <Button onClick={handleSaveNote}>Save Note</Button>
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                    <div className="md:col-span-2">
                        <Card>
                            <CardHeader>
                                <div className="flex items-start justify-between">
                                    <div>
                                        <CardTitle>{report.reportTitle}</CardTitle>
                                        <CardDescription>
                                            Submitted on {"12/12/2032"}
                                        </CardDescription>
                                    </div>
                                    <StatusBadge status={status} />
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    <div>
                                        <h3 className="text-muted-foreground mb-2 text-sm font-medium">
                                            Report Content
                                        </h3>
                                        <p className="text-sm">{report.reportContent}</p>
                                    </div>

                                    <Separator />

                                    <div>
                                        <h3 className="text-muted-foreground mb-2 text-sm font-medium">
                                            Attached Images
                                        </h3>
                                        {report.imageReports.length > 0 ? (
                                            <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
                                                {report.imageReports.map((image, index) => (
                                                    <div
                                                        key={index}
                                                        className="relative aspect-square cursor-pointer overflow-hidden rounded-md border transition-opacity hover:opacity-90"
                                                        onClick={() => handleImageClick(image)}
                                                    >
                                                        <Image
                                                            fill
                                                            alt={`Report image ${index + 1}`}
                                                            className="object-cover"
                                                            src={image || "/placeholder.svg"}
                                                        />
                                                    </div>
                                                ))}
                                            </div>
                                        ) : (
                                            <p className="text-muted-foreground text-sm">
                                                No images attached
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    <div className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Reporter Information</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    <div className="flex items-center gap-2">
                                        <IconUser className="text-muted-foreground size-4" />
                                        <span className="text-sm">{report.fullName}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <IconMail className="text-muted-foreground size-4" />
                                        <span className="text-sm">{report.email}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <IconCalendar className="text-muted-foreground size-4" />
                                        <span className="text-sm">
                                            User ID: {report.userId.substring(0, 8)}...
                                        </span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Update Status</CardTitle>
                                <CardDescription>
                                    Change the current status of this report
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Select value={status} onValueChange={handleStatusChange}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="New">New</SelectItem>
                                        <SelectItem value="In Progress">In Progress</SelectItem>
                                        <SelectItem value="Resolved">Resolved</SelectItem>
                                        <SelectItem value="Rejected">Rejected</SelectItem>
                                    </SelectContent>
                                </Select>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Add Note</CardTitle>
                                <CardDescription>
                                    Add internal notes about this report
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Textarea
                                    className="min-h-[100px]"
                                    placeholder="Add internal note about this report..."
                                    value={note}
                                    onChange={(e) => setNote(e.target.value)}
                                />
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>

            <Dialog open={imageDialogOpen} onOpenChange={setImageDialogOpen}>
                <DialogContent className="max-w-3xl">
                    <DialogHeader>
                        <DialogTitle>Report Image</DialogTitle>
                        <DialogDescription>
                            Viewing attached image from report
                        </DialogDescription>
                    </DialogHeader>
                    <div className="relative h-[60vh] w-full">
                        {selectedImage && (
                            <Image
                                fill
                                alt="Report image"
                                className="object-contain"
                                src={selectedImage || "/placeholder.svg"}
                            />
                        )}
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}
