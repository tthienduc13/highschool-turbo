import { Document } from "@highschool/interfaces";
import { useDeleteDocumentMutation } from "@highschool/react-query/queries";
import { Button } from "@highschool/ui/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@highschool/ui/components/ui/card";
import { IconDownload, IconEye, IconThumbUp } from "@tabler/icons-react";
import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

import { ConfirmDialog } from "@/components/ui/confirm-dialog";

export const DocumentCard = ({ documents }: { documents: Document[] }) => {
    const [openAlert, setOpenAlert] = useState<boolean>(false);
    const { mutateAsync: deleteDocument, isPending } =
        useDeleteDocumentMutation();
    const [documentId, setDocumentId] = useState<string>("");
    const router = useRouter();

    const handleDelteDocument = async () => {
        const result = await deleteDocument(documentId);

        if (result) {
            toast.success("Document deleted successfully");
            setOpenAlert(false);
        } else {
            toast.error("Failed to delete document");
        }
    };

    return (
        <>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {documents.map((doc) => (
                    <div key={doc.id}>
                        <Card key={doc.id} className="flex flex-col">
                            <CardHeader>
                                <CardTitle>{doc.documentName}</CardTitle>
                                <CardDescription>{doc.documentDescription}</CardDescription>
                            </CardHeader>
                            <CardContent className="grow">
                                <div className="space-y-2">
                                    <p>
                                        <strong>Subject:</strong>{" "}
                                        {doc.subjectCurriculum.subjectName}
                                    </p>
                                    <p>
                                        <strong>Curriculum:</strong>{" "}
                                        {doc.subjectCurriculum.curriculumName}
                                    </p>
                                    <p>
                                        <strong>Category:</strong> {doc.category.categoryName}
                                    </p>
                                    <p>
                                        <strong>Year:</strong> {doc.documentYear}
                                    </p>
                                    <p>
                                        <strong>Semester:</strong> {doc.semester}
                                    </p>
                                    {doc.schoolName && (
                                        <p>
                                            <strong>School:</strong> {doc.schoolName}
                                        </p>
                                    )}
                                </div>
                            </CardContent>
                            <CardFooter className="flex items-center justify-between">
                                <div className="flex items-center space-x-2">
                                    <IconEye size={16} /> <span>{doc.view}</span>
                                    <IconDownload size={16} /> <span>{doc.download}</span>
                                    <IconThumbUp size={16} /> <span>{doc.like}</span>
                                </div>
                                <div className="flex gap-1">
                                    <Button
                                        size="sm"
                                        variant="default"
                                        onClick={() => {
                                            router.push(`/documents/update/${doc.documentSlug}`);
                                        }}
                                    >
                                        Update
                                    </Button>
                                    <Button
                                        size="sm"
                                        variant="destructive"
                                        onClick={() => {
                                            setDocumentId(doc.id);
                                            setOpenAlert(true);
                                        }}
                                    >
                                        Delete
                                    </Button>
                                </div>
                            </CardFooter>
                        </Card>
                    </div>
                ))}
            </div>
            <ConfirmDialog
                desc={
                    <p className="mb-2">
                        Are you sure you want to delete this Document? This action cannot be
                        undone.
                    </p>
                }
                handleConfirm={handleDelteDocument}
                open={openAlert}
                title="Delete Document"
                onOpenChange={setOpenAlert}
            />
        </>
    );
};
