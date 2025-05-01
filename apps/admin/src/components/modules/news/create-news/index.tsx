"use client";

import { Button } from "@highschool/ui/components/ui/button";
import { Card, CardContent } from "@highschool/ui/components/ui/card";
import { Input } from "@highschool/ui/components/ui/input";
import { Label } from "@highschool/ui/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@highschool/ui/components/ui/select";
import { useState } from "react";
import {
    useCreateBlogMutation,
    useProvincesQuery,
    useUploaderMutation,
} from "@highschool/react-query/queries";
import { ContentData } from "@highschool/components/minimal-editor/ui/types";
import { toast } from "sonner";
import MinimalTiptapEditor from "@highschool/components/minimal-editor/ui/minimal-tiptap";
import { HighSchoolAssets } from "@highschool/interfaces";

import { ComboboxTag } from "./combobox-tag";

import ImageUploader from "@/components/ui/image-upload";

function CreateNewsModule() {
    const titleHeading = "Create News";
    const [selectedProvince, setSelectedProvince] = useState<string>("");
    const [tag, setTag] = useState<string>("");
    const [title, setTitle] = useState<string>("");
    const [contentData, setContentData] = useState<ContentData>();
    const { mutateAsync: uploadImage } = useUploaderMutation();
    const [singleFile, setSingleFile] = useState<File | null>(null);

    const { mutateAsync: createBlogMutation, isPending: isLoading } =
        useCreateBlogMutation();

    const { data: provices } = useProvincesQuery({
        pageNumber: 1,
        pageSize: 999999,
    });

    const handleCreateBlog = async () => {
        if (title.length < 10) {
            toast.error("Title must be at least 10 characters long.");

            return;
        }

        if (!selectedProvince) {
            toast.error("Please select province");

            return;
        }

        if (!tag) {
            toast.error("Please select tag");

            return;
        }

        if (!singleFile) {
            toast.error("Please upload thumbnail");

            return;
        }

        const textEditor = contentData?.contentText as string;

        if (textEditor.length < 10) {
            toast.error("Content must be at least 10 characters long.");

            return;
        }

        try {
            const content = await contentData?.onGetContentData();

            if (!content) {
                toast.error("Failed to create news");

                return;
            }

            const url = await uploadImage({
                image: singleFile,
                folder: HighSchoolAssets.NewsThumbnail,
            });

            const result = await createBlogMutation({
                newsTagId: tag,
                newName: title,
                content: content?.contentText as string,
                contentHtml: content?.contentHtml as string,
                image: url.data ?? "",
                location: selectedProvince,
            });

            toast.success(result.message);

            window.location.reload();
        } catch {
            toast.error("Failed to create news");
        }
    };

    const handleImageChange = (file: File | null) => {
        if (file === null) {
            setSingleFile(null);
        } else {
            setSingleFile(file);
        }
    };

    return (
        <div className="bg-background flex w-full  flex-col rounded-lg p-4">
            <div className="text-primary text-3xl font-bold">{titleHeading}</div>
            <Card className="mt-4">
                <CardContent className="space-y-8">
                    <div className="mt-4 space-y-2">
                        <Label className="text-lg font-semibold" htmlFor="title">
                            Title News
                        </Label>
                        <Input
                            className="p-6 text-[0.9rem]"
                            id="title"
                            placeholder="Enter your article title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>

                    <div className="flex">
                        <ImageUploader
                            className="w-[45vw]"
                            defaultMode="single"
                            label="Avatar"
                            maxImages={1}
                            showModeToggle={false}
                            value={""}
                            onChange={(e) => handleImageChange(Array.isArray(e) ? e[0] : e)}
                        />

                        <div className="ml-6 flex w-[18vw] flex-col items-center">
                            <div className="flex w-full flex-col">
                                <Label className="text-lg font-semibold" htmlFor="province">
                                    Select Province
                                </Label>
                                <Select
                                    value={selectedProvince ?? ""}
                                    onValueChange={setSelectedProvince}
                                >
                                    <SelectTrigger className="bg-background mr-4 rounded-lg border-2 text-left">
                                        <SelectValue
                                            className="px-4"
                                            placeholder="Select your province"
                                        />
                                    </SelectTrigger>
                                    <SelectContent
                                        className="placeholder:text-muted-foreground h-[50vh] overflow-y-auto"
                                        onCloseAutoFocus={(e) => e.preventDefault()}
                                    >
                                        {provices?.data?.map((country) => (
                                            <SelectItem
                                                key={country.provinceId}
                                                value={country.provinceName}
                                            >
                                                {country.provinceName}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="mt-6 flex w-full flex-col">
                                <Label className="text-lg font-semibold" htmlFor="tags">
                                    Tags
                                </Label>
                                <ComboboxTag setTag={setTag} />
                            </div>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label className="text-lg font-semibold" htmlFor="content">
                            Content News
                        </Label>
                        {/* <ContentEditor
                            setEditor={setEditorInstance}
                            contentHtml={contentHtml}
                        /> */}
                        <MinimalTiptapEditor
                            autofocus={true}
                            className="w-full"
                            editable={true}
                            editorClassName="focus:outline-none"
                            editorContentClassName="p-5"
                            immediatelyRender={false}
                            output="html"
                            placeholder="Type your description here..."
                            setContentData={setContentData}
                        />
                    </div>
                    <Button
                        className="w-full"
                        disabled={isLoading}
                        onClick={handleCreateBlog}
                    >
                        Save News
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
}

export default CreateNewsModule;
