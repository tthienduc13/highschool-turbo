"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@highschool/ui/components/ui/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@highschool/ui/components/ui/form";
import { Input } from "@highschool/ui/components/ui/input";
import { Textarea } from "@highschool/ui/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@highschool/ui/components/ui/select";
import { Separator } from "@highschool/ui/components/ui/separator";
import { IconLoader2 } from "@tabler/icons-react";
import { Skeleton } from "@highschool/ui/components/ui/skeleton";
import { Label } from "@highschool/ui/components/ui/label";
import {
    useCoursesQuery,
    useCurriculaQuery,
    useDocumentManagementBySlugQuery,
    useProvincesQuery,
    useSchoolsQuery,
    useUpdateDocumentMutation,
    useUploadfileMutation,
} from "@highschool/react-query/queries";
import { useRouter } from "next/navigation";

const currentYear = new Date().getFullYear();
const years = Array.from({ length: 10 }, (_, i) => currentYear - i);

const formSchema = z.object({
    documentName: z.string().min(1, "Document name is required"),
    documentDescription: z.string().min(1, "Document description is required"),
    schoolId: z.string().uuid("Invalid school ID").optional(),
    curriculumId: z.string().uuid("Invalid curriculum ID"),
    subjectId: z.string().uuid("Invalid subject ID"),
    semester: z.enum(["1", "2"]),
    documentYear: z
        .number()
        .min(years[years.length - 1])
        .max(currentYear),
    file: z
        .instanceof(File)
        .refine(
            (file) => file.type === "application/pdf",
            "Only PDF files are allowed.",
        )
        .refine((file) => file.size <= 5000000, "Max file size is 5MB.")
        .optional(),
});

interface UpdateDocumentModuleProps {
    slug: string;
}

export default function UpdateDocumentModule({
    slug,
}: UpdateDocumentModuleProps) {
    const [file, setFile] = useState<File | null>(null);
    const [selectedProvince, setSelectedProvince] = useState<string>("");
    const [isDownloaded, setIsDownloaded] = useState(false);
    const router = useRouter();

    const { data: subjects, isLoading: subjectLoading } = useCoursesQuery({
        pageNumber: 1,
        pageSize: 100,
    });

    const { data: curriculums, isLoading: curriculumLoading } = useCurriculaQuery(
        {
            pageNumber: 1,
            pageSize: 100,
        },
    );
    const { data: schoolData, isLoading: schoolLoading } = useSchoolsQuery({
        searchProvince: selectedProvince,
        pageNumber: 1,
        pageSize: 9999,
    });

    const { data: provinceData } = useProvincesQuery({
        pageSize: 63,
        pageNumber: 1,
    });

    const { data: document, isPending: documentLoading } =
        useDocumentManagementBySlugQuery({
            slug: slug,
        });

    const { mutateAsync: updateDocument, isPending: creating } =
        useUpdateDocumentMutation();

    const isLoading = curriculumLoading || subjectLoading || documentLoading;

    useEffect(() => {
        if (document === undefined && !documentLoading) {
            router.push("/documents/management");
        }
    }, [document, documentLoading]);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            documentName: document?.documentName,
            documentDescription: document?.documentDescription,
            semester: (document?.semester?.toString() as "1" | "2") ?? "1",
            documentYear: currentYear,
            schoolId: document?.school.id,
            curriculumId: document?.subjectCurriculum.curriculumId,
            subjectId: document?.subjectCurriculum.subjectCurriculumId,
        },
    });

    useEffect(() => {
        if (document && !documentLoading) {
            form.reset({
                documentName: document.documentName,
                documentDescription: document.documentDescription,
                semester: (document.semester?.toString() as "1" | "2") ?? "1",
                documentYear: document.documentYear,
                schoolId: document.school.id,
                curriculumId: document.subjectCurriculum.curriculumId,
                subjectId: document.subjectCurriculum.subjectId,
            });
        }
    }, [document, documentLoading]);

    const { mutate: uploadFile } = useUploadfileMutation();

    async function onSubmit(values: z.infer<typeof formSchema>) {
        if (file) {
            uploadFile({ documentId: document?.id ?? "", file: file! });
        }

        const resultUpdating = await updateDocument({
            documentName: values.documentName,
            documentDescription: values.documentDescription,
            schoolId: values.schoolId,
            semester: parseInt(values.semester),
            documentYear: values.documentYear,
            curriculumId: values.curriculumId,
            subjectId: values.subjectId,
            id: document?.id,
        });

        if (
            resultUpdating &&
            (resultUpdating.status === 200 || resultUpdating.status === 201)
        ) {
            router.push("/documents/management");
        }
    }

    if (isLoading) {
        return (
            <div className="flex w-full flex-col gap-6 p-4">
                <Skeleton className="h-10 w-3/4" />
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-20 w-full" />
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-12 w-full" />
            </div>
        );
    }

    return (
        <div className="bg-background flex w-full flex-col gap-6 rounded-lg p-6 shadow-md">
            <h1 className="text-primary text-3xl font-bold">Create Document</h1>
            <Form {...form}>
                <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
                    <div className="flex flex-row rounded-lg border">
                        <FormField
                            control={form.control}
                            name="semester"
                            render={({ field }) => (
                                <FormItem className="w-[150px] overflow-hidden">
                                    <Select
                                        defaultValue={field.value}
                                        onValueChange={field.onChange}
                                    >
                                        <FormControl>
                                            <SelectTrigger className="h-12 rounded-none border-none text-base font-semibold shadow-none focus-visible:ring-0">
                                                <SelectValue placeholder="Select semester" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value={"1"}>Semester 1</SelectItem>
                                            <SelectItem value={"2"}>Semester 2</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Separator className="h-12 w-px" />
                        <FormField
                            control={form.control}
                            name="documentName"
                            render={({ field }) => (
                                <FormItem className="flex w-full items-center">
                                    <FormControl>
                                        <Input
                                            className="h-12 border-none text-lg shadow-none focus-visible:ring-0"
                                            placeholder="Enter document name"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <FormField
                        control={form.control}
                        name="documentDescription"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Document Description</FormLabel>
                                <FormControl>
                                    <Textarea
                                        placeholder="Enter document description"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className="flex flex-col gap-2">
                        <Label>Place</Label>
                        <div className="flex flex-row rounded-lg border">
                            <Select
                                value={selectedProvince}
                                onValueChange={(value) => setSelectedProvince(value)}
                            >
                                <SelectTrigger className="h-10 w-1/2   rounded-none border-none shadow-none focus-visible:ring-0">
                                    <SelectValue placeholder="Select a province" />
                                </SelectTrigger>
                                <SelectContent>
                                    {provinceData?.data.map((province) => (
                                        <SelectItem
                                            key={province.provinceId}
                                            value={province.provinceName?.toString() ?? ""}
                                        >
                                            {province.provinceName}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <Separator className="h-10 w-px" />
                            <FormField
                                control={form.control}
                                name="schoolId"
                                render={({ field }) => (
                                    <FormItem className="w-1/2">
                                        <Select
                                            defaultValue={field.value}
                                            disabled={schoolLoading}
                                            onValueChange={field.onChange}
                                        >
                                            <FormControl>
                                                <SelectTrigger className="h-10 w-full   rounded-none border-none shadow-none focus-visible:ring-0">
                                                    <SelectValue placeholder="Select a school" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {schoolData?.data.map((school) => (
                                                    <SelectItem key={school.id} value={school.id}>
                                                        {school.schoolName}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>

                    <div className="flex flex-col gap-2">
                        <Label>Course</Label>
                        <div className="flex flex-row rounded-lg border">
                            <FormField
                                control={form.control}
                                name="subjectId"
                                render={({ field }) => (
                                    <FormItem className="w-1/2">
                                        <Select
                                            defaultValue={field.value}
                                            onValueChange={field.onChange}
                                        >
                                            <FormControl>
                                                <SelectTrigger className="h-10   rounded-none border-none shadow-none focus-visible:ring-0">
                                                    <SelectValue placeholder="Select a course" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {subjects?.data.map((subject) => (
                                                    <SelectItem key={subject.id} value={subject.id}>
                                                        {subject.subjectName}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Separator className="h-10 w-px" />
                            <FormField
                                control={form.control}
                                name="curriculumId"
                                render={({ field }) => (
                                    <FormItem>
                                        <Select
                                            defaultValue={field.value}
                                            onValueChange={field.onChange}
                                        >
                                            <FormControl>
                                                <SelectTrigger className="h-10   rounded-none border-none shadow-none focus-visible:ring-0">
                                                    <SelectValue placeholder="Select a curriculum" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {curriculums?.data.map((curriculum) => (
                                                    <SelectItem key={curriculum.id} value={curriculum.id}>
                                                        {curriculum.curriculumName}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>

                    {/* Document Year */}
                    <div className="flex items-center gap-8">
                        <FormField
                            control={form.control}
                            name="documentYear"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Document Year</FormLabel>
                                    <Select
                                        defaultValue={field.value.toString()}
                                        onValueChange={(value) => field.onChange(parseInt(value))}
                                    >
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select a year" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {years.map((year) => (
                                                <SelectItem key={year} value={year.toString()}>
                                                    {year}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    {/* File Upload */}
                    <FormField
                        control={form.control}
                        name="file"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Upload Document</FormLabel>
                                <FormControl>
                                    <Input
                                        className="file:bg-primary/10"
                                        type="file"
                                        onChange={(e) => {
                                            const file = e.target.files?.[0];

                                            if (file) {
                                                field.onChange(file);
                                                setFile(file);
                                            }
                                        }}
                                    />
                                </FormControl>
                                <FormDescription>
                                    Only PDF files are allowed. Max file size: 5MB.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    {/* Submit Button */}
                    <Button
                        className="float-end w-fit"
                        disabled={creating || isLoading}
                        type="submit"
                    >
                        {creating ? (
                            <IconLoader2 className="animate-spin" />
                        ) : (
                            "Update Document"
                        )}
                    </Button>
                </form>
            </Form>
        </div>
    );
}
