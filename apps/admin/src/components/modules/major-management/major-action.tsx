import { Button } from "@highschool/ui/components/ui/button";
import { Input } from "@highschool/ui/components/ui/input";
import { Label } from "@highschool/ui/components/ui/label";
import { motion } from "framer-motion";
import { useState } from "react";
import { IconLoader2 } from "@tabler/icons-react";
import { Textarea } from "@highschool/ui/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@highschool/ui/components/ui/select";
import {
    useCreateMajorMutation,
    useGetMajorCategoryNameQuery,
    useUpdateMajorMutation,
} from "@highschool/react-query/queries";

interface MajorActionProps {
    mode: "create" | "edit";
}

export const MajorAction = ({ mode }: MajorActionProps) => {
    const { mutate: createMajor, isPending: isCreating } =
        useCreateMajorMutation();
    const { mutate: updateMajor, isPending: isUpdating } =
        useUpdateMajorMutation();
    const { data: majorCategories, isPending: isMajorCategoryLoading } =
        useGetMajorCategoryNameQuery({
            pageNumber: -1,
            pageSize: 10,
            search: "",
        });

    const major = useMajorStore((s) => s.editMajor);

    const [majorCategoryCode, setMajorCategoryCode] = useState<string>(
        major?.majorCategoryCode ?? "",
    );
    const [majorCode, setMajorCode] = useState<string>(major?.majorCode ?? "");
    const [name, setName] = useState<string>(major?.name ?? "");
    const [description, setDescription] = useState<string>(
        major?.description ?? "",
    );
    const [skillYouLearn, setSkillYouLearn] = useState<string>(
        major?.skillYouLearn ?? "",
    );

    const closeCreate = useMajorStore((s) => s.closeCreate);
    const closeEdit = useMajorStore((s) => s.closeEdit);

    const isDisabled = isCreating || isUpdating;

    const validationFields = () => {
        if (
            !majorCode ||
            !name ||
            !description ||
            !skillYouLearn ||
            !majorCategoryCode
        ) {
            toast({
                title: "Some errors occurred",
                description: "Please fill all required fields",
                variant: "destructive",
            });

            return false;
        }

        if (name.length <= 5) {
            toast({
                title: "Some errors occurred",
                description: "Name must be at least 5 characters",
                variant: "destructive",
            });

            return false;
        }

        if (description.length <= 10) {
            toast({
                title: "Some errors occurred",
                description: "Description must be at least 10 characters",
                variant: "destructive",
            });

            return false;
        }

        return true;
    };

    const resetField = () => {
        setMajorCategoryCode("");
        setMajorCode("");
        setName("");
        setDescription("");
        setSkillYouLearn("");
    };

    const handleSave = () => {
        if (!validationFields()) {
            return;
        }

        try {
            if (mode === "create") {
                createMajor({
                    majors: [
                        {
                            name: name,
                            majorCode: majorCode,
                            description: description,
                            skillYouLearn: skillYouLearn,
                            majorCategoryCode: majorCategoryCode,
                        },
                    ],
                });
            } else if (mode === "edit") {
                updateMajor({
                    major: {
                        id: major?.id,
                        name: name,
                        majorCode: majorCode,
                        description: description,
                        skillYouLearn: skillYouLearn,
                        majorCategoryCode: majorCategoryCode,
                    },
                });
            }

            resetField();
            closeCreate();
        } catch {
            return;
        }
    };

    return (
        <motion.div
            animate={{ width: "35%", opacity: 1 }}
            className="flex h-full flex-col gap-4 overflow-auto rounded-lg"
            exit={{ width: 0, opacity: 0 }}
            initial={{ width: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
            <div className="bg-background  flex flex-col gap-4 p-4">
                <div className="flex w-full flex-row items-center justify-between">
                    <h2 className="text-lg font-semibold">Create University</h2>
                    <div className="flex flex-row gap-2">
                        <Button disabled={isDisabled} onClick={handleSave}>
                            {isCreating ? (
                                <IconLoader2 className="animate-spin" />
                            ) : mode === "create" ? (
                                "Create"
                            ) : (
                                "Update"
                            )}
                        </Button>
                        <Button
                            size="icon"
                            variant="ghost"
                            onClick={mode === "create" ? closeCreate : closeEdit}
                        >
                            <X />
                        </Button>
                    </div>
                </div>
                <div className="w-full space-y-5 px-1 ">
                    <div>
                        <Label className="text-sm font-semibold">
                            Major Code <span className="text-primary">(required)</span>
                        </Label>
                        <Input
                            placeholder="Major Code"
                            type="text"
                            value={majorCode}
                            onChange={(e) => setMajorCode(e.target.value)}
                        />
                    </div>
                    <div>
                        <Label className="text-sm font-semibold">
                            Name <span className="text-primary">(required)</span>
                        </Label>
                        <Input
                            placeholder="Major Name"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div>
                        <Label className="text-sm font-semibold">
                            Description <span className="text-primary">(required)</span>
                        </Label>
                        <Textarea
                            placeholder="Description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>
                    <div>
                        <Label className="text-sm font-semibold">
                            Skill You Learn <span className="text-primary">(required)</span>
                        </Label>
                        <Textarea
                            placeholder="Skill You Learn"
                            value={skillYouLearn}
                            onChange={(e) => setSkillYouLearn(e.target.value)}
                        />
                    </div>
                    <div>
                        <Label className="text-sm font-semibold">
                            Major Category <span className="text-primary">(required)</span>
                        </Label>
                        <Select
                            disabled={isMajorCategoryLoading}
                            value={majorCategoryCode}
                            onValueChange={setMajorCategoryCode}
                        >
                            <SelectTrigger className="bg-background mr-4 rounded-lg border-2 text-left">
                                <SelectValue
                                    className="px-4"
                                    placeholder="Select major category"
                                />
                            </SelectTrigger>
                            <SelectContent
                                className="placeholder:text-muted-foreground h-[50vh] overflow-y-auto"
                                onCloseAutoFocus={(e) => e.preventDefault()}
                            >
                                {majorCategories?.data.map((majorCategory) => (
                                    <SelectItem
                                        key={majorCategory.majorCategoryCode}
                                        value={majorCategory.majorCategoryCode}
                                    >
                                        {majorCategory.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};
