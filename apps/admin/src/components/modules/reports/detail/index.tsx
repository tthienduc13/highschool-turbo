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
import { IconMail, IconUserCircle } from "@tabler/icons-react";
import {
    useReportAppQuery,
    useUpdateReportStatusAppMutation,
} from "@highschool/react-query/queries";
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@highschool/ui/components/ui/avatar";
import { useRouter } from "next/navigation";

import { StatusBadge } from "../table/status-badge";

import { ReportStatus } from "@/domain/enums/report";

export default function ReportDetailModule({ id }: { id: string }) {
    const router = useRouter();
    const [status, setStatus] = useState("New");
    const [imageDialogOpen, setImageDialogOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState("");
    const { mutateAsync: updateReportStatus } =
        useUpdateReportStatusAppMutation();

    const { data: reports } = useReportAppQuery({
        page: 1,
        eachPage: 1,
        reportId: id,
    });

    // useEffect(() => {
    //     if (reports === undefined) {
    //         return router.push("/report");
    //     }
    // }, [reports]);

    const report = reports?.data[0];

    const handleStatusChange = async (newStatus: string) => {
        const result = await updateReportStatus({
            reportId: id,
            status: newStatus,
        });

        if (result) {
            setStatus(newStatus);
        }
    };

    const handleImageClick = (imageUrl: string) => {
        setSelectedImage(imageUrl);
        setImageDialogOpen(true);
    };

    return (
        <div>
            <div className="flex-1 space-y-4 overflow-auto p-2 md:py-4">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-primary mb-0 pb-0 text-2xl font-bold">
                            Report Detail
                        </p>
                        <span className="text-lg text-gray-400">{report?.id}</span>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                    <div className="md:col-span-2">
                        <Card>
                            <CardHeader>
                                <div className="flex items-start justify-between">
                                    <div>
                                        <CardTitle>{report?.reportTitle}</CardTitle>
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
                                        <p className="text-sm">{report?.reportContent}</p>
                                    </div>

                                    <Separator />

                                    <div>
                                        <h3 className="text-muted-foreground mb-2 text-sm font-medium">
                                            Attached Images
                                        </h3>
                                        {(report?.imageReports.length ?? 0 > 0) ? (
                                            <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
                                                {report?.imageReports.map((image, index) => (
                                                    <div
                                                        key={image}
                                                        className="relative aspect-square cursor-pointer overflow-hidden rounded-md border transition-opacity hover:opacity-90"
                                                        role="button"
                                                        tabIndex={0}
                                                        onClick={() => handleImageClick(image)}
                                                        onKeyPress={(e) => {
                                                            if (e.key === "Enter" || e.key === " ") {
                                                                handleImageClick(image);
                                                            }
                                                        }}
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
                                        {/* <IconUser className="text-muted-foreground size-4" /> */}
                                        <Avatar className="size-8">
                                            <AvatarImage
                                                alt={"image"}
                                                src={report?.user.profilePicture ?? ""}
                                            />
                                            <AvatarFallback>
                                                {report?.user?.fullname?.[0] ?? ""}
                                            </AvatarFallback>
                                        </Avatar>
                                        <span className="text-sm">{report?.fullName}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <IconMail className="text-muted-foreground size-4" />
                                        <span className="text-sm">{report?.email}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <IconUserCircle className="text-muted-foreground size-4" />
                                        <span className="text-sm">{report?.user.roleName}</span>
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
                                        {Object.values(ReportStatus).map((status) => (
                                            <SelectItem key={status} value={status}>
                                                {status}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
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
