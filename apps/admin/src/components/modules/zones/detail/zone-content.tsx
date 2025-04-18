import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@highschool/ui/components/ui/card";
import { Button } from "@highschool/ui/components/ui/button";
import { Badge } from "@highschool/ui/components/ui/badge";
import {
    IconFileText,
    IconFolder,
    IconLayoutGrid,
    IconPencil,
} from "@tabler/icons-react";

interface ZoneContentProps {
    zone: {
        documentIds: string[];
        flashcardIds: string[];
        folderIds: string[];
        assignments: string[];
    };
}

export function ZoneContent({ zone }: ZoneContentProps) {
    const totalContent =
        zone.documentIds.length +
        zone.flashcardIds.length +
        zone.folderIds.length +
        zone.assignments.length;

    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <div>
                    <CardTitle>Zone Content</CardTitle>
                    <CardDescription>
                        {totalContent} total item{totalContent !== 1 ? "s" : ""} in this
                        zone
                    </CardDescription>
                </div>
                <Button size="sm" variant="outline">
                    View All
                </Button>
            </CardHeader>
            <CardContent>
                <div className="grid gap-4 sm:grid-cols-2">
                    <div className="rounded-lg border p-4">
                        <div className="mb-4 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <IconFileText className="text-muted-foreground size-5" />
                                <h3 className="font-medium">Documents</h3>
                            </div>
                            <Badge variant="secondary">{zone.documentIds.length}</Badge>
                        </div>
                        <div className="space-y-2">
                            {zone.documentIds.length > 0 ? (
                                zone.documentIds.slice(0, 3).map((docId) => (
                                    <div
                                        key={docId}
                                        className="flex items-center gap-2 rounded-md border px-3 py-2"
                                    >
                                        <IconFileText className="text-muted-foreground size-4" />
                                        <span className="text-sm font-medium">{docId}</span>
                                    </div>
                                ))
                            ) : (
                                <p className="text-muted-foreground text-sm">No documents</p>
                            )}
                            {zone.documentIds.length > 3 && (
                                <Button className="mt-2 w-full" size="sm" variant="link">
                                    View {zone.documentIds.length - 3} more
                                </Button>
                            )}
                        </div>
                    </div>

                    <div className="rounded-lg border p-4">
                        <div className="mb-4 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <IconLayoutGrid className="text-muted-foreground size-5" />
                                <h3 className="font-medium">Flashcards</h3>
                            </div>
                            <Badge variant="secondary">{zone.flashcardIds.length}</Badge>
                        </div>
                        <div className="space-y-2">
                            {zone.flashcardIds.length > 0 ? (
                                zone.flashcardIds.slice(0, 3).map((flashId) => (
                                    <div
                                        key={flashId}
                                        className="flex items-center gap-2 rounded-md border px-3 py-2"
                                    >
                                        <IconLayoutGrid className="text-muted-foreground size-4" />
                                        <span className="text-sm font-medium">{flashId}</span>
                                    </div>
                                ))
                            ) : (
                                <p className="text-muted-foreground text-sm">No flashcards</p>
                            )}
                            {zone.flashcardIds.length > 3 && (
                                <Button className="mt-2 w-full" size="sm" variant="link">
                                    View {zone.flashcardIds.length - 3} more
                                </Button>
                            )}
                        </div>
                    </div>

                    <div className="rounded-lg border p-4">
                        <div className="mb-4 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <IconFolder className="text-muted-foreground size-5" />
                                <h3 className="font-medium">Folders</h3>
                            </div>
                            <Badge variant="secondary">{zone.folderIds.length}</Badge>
                        </div>
                        <div className="space-y-2">
                            {zone.folderIds.length > 0 ? (
                                zone.folderIds.slice(0, 3).map((folderId) => (
                                    <div
                                        key={folderId}
                                        className="flex items-center gap-2 rounded-md border px-3 py-2"
                                    >
                                        <IconFolder className="text-muted-foreground size-4" />
                                        <span className="text-sm font-medium">{folderId}</span>
                                    </div>
                                ))
                            ) : (
                                <p className="text-muted-foreground text-sm">No folders</p>
                            )}
                            {zone.folderIds.length > 3 && (
                                <Button className="mt-2 w-full" size="sm" variant="link">
                                    View {zone.folderIds.length - 3} more
                                </Button>
                            )}
                        </div>
                    </div>

                    <div className="rounded-lg border p-4">
                        <div className="mb-4 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <IconPencil className="text-muted-foreground size-5" />
                                <h3 className="font-medium">Assignments</h3>
                            </div>
                            <Badge variant="secondary">{zone.assignments.length}</Badge>
                        </div>
                        <div className="space-y-2">
                            {zone.assignments.length > 0 ? (
                                zone.assignments.slice(0, 3).map((assignId) => (
                                    <div
                                        key={assignId}
                                        className="flex items-center gap-2 rounded-md border px-3 py-2"
                                    >
                                        <IconPencil className="text-muted-foreground size-4" />
                                        <span className="text-sm font-medium">{assignId}</span>
                                    </div>
                                ))
                            ) : (
                                <p className="text-muted-foreground text-sm">No assignments</p>
                            )}
                            {zone.assignments.length > 3 && (
                                <Button className="mt-2 w-full" size="sm" variant="link">
                                    View {zone.assignments.length - 3} more
                                </Button>
                            )}
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
