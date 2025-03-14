import { AdmissionMethod, degreeLevels } from "@highschool/interfaces";
import {
    useCreateUniversityMajorListMutation,
    useGetMajorNameQuery,
    useUpdateUniversityMajorMutation,
} from "@highschool/react-query/queries";
import { Button } from "@highschool/ui/components/ui/button";
import { Input } from "@highschool/ui/components/ui/input";
import { Label } from "@highschool/ui/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@highschool/ui/components/ui/select";
import { IconLoader2, IconX } from "@tabler/icons-react";
import { motion } from "framer-motion";
import { useState } from "react";
import { toast } from "sonner";

interface UniversityMajorActionProps {
    mode: "create" | "edit";
    uniCode: string;
}

export const UniversityMajorAction = ({
    mode,
    uniCode,
}: UniversityMajorActionProps) => {
    const { mutate: createUniversityMajorList, isPending: isCreating } =
        useCreateUniversityMajorListMutation();
    const { mutate: updateUniversity, isPending: isUpdating } =
        useUpdateUniversityMajorMutation();

    const { data: majorNames, isPending: isMajorLoading } = useGetMajorNameQuery({
        pageNumber: -1,
        pageSize: 10,
    });

    const [majorCode, setMajorCode] = useState<string>("");
    const [quota, setQuota] = useState<number>(0);
    const [admissionMethod, setAdmissionMethod] = useState<string>("");
    const [degreeLevel, setDegreeLevel] = useState<string>("");

    const isDisabled = isCreating || isUpdating;

    const resetField = () => {
        setMajorCode("");
        setQuota(0);
        setAdmissionMethod("");
        setDegreeLevel("");
    };

    const validationFields = () => {
        if (!majorCode || !quota || !admissionMethod || !degreeLevel) {
            toast.error("Please fill all required fields");

            return false;
        }

        if (quota < 0) {
            toast.error("Quota must be greater or equal than 0");

            return false;
        }

        return true;
    };

    const handleSaveUniversityMajor = () => {
        if (!validationFields()) {
            return;
        }

        try {
            if (mode === "create") {
                createUniversityMajorList({
                    universityMajorList: [
                        {
                            uniCode: uniCode,
                            majorCode: majorCode,
                            admissionMethods: admissionMethod,
                            quota: quota,
                            degreeLevel: degreeLevel,
                        },
                    ],
                });
            } else if (mode === "edit") {
                // updateUniversity({
                //     universityMajor: {
                //         id: universityMajor?.id,
                //         uniCode: uniCode,
                //         majorCode: majorCode,
                //         admissionMethods: admissionMethod,
                //         quota: quota,
                //         degreeLevel: degreeLevel,
                //     },
                // });
            }

            resetField();
            //closeCreate();
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
                        <Button disabled={isDisabled} onClick={handleSaveUniversityMajor}>
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
                        //onClick={mode === "create" ? closeCreate : closeEdit}
                        >
                            <IconX />
                        </Button>
                    </div>
                </div>
                <div className="w-full space-y-5 px-1 ">
                    <div>
                        <Label className="text-sm font-semibold">
                            Major <span className="text-primary">(required)</span>
                        </Label>
                        {/* <Combobox
                            className="w-full"
                            disabled={isMajorLoading}
                            items={
                                majorNames?.data.map((item) => ({
                                    label: item.name,
                                    value: item.majorCode,
                                })) ?? []
                            }
                            placeHolder="Select Major"
                            setValue={setMajorCode}
                            value={majorCode}
                        /> */}
                    </div>
                    <div>
                        <Label className="text-sm font-semibold">
                            Quota <span className="text-primary">(required)</span>
                        </Label>
                        <Input
                            placeholder="Quota"
                            type="text"
                            value={quota}
                            onChange={(e) => setQuota(Number(e.target.value))}
                        />
                    </div>
                    <div>
                        <Label className="text-sm font-semibold">
                            Admission Method <span className="text-primary">(required)</span>
                        </Label>
                        <Select
                            value={admissionMethod}
                            onValueChange={(value) => setAdmissionMethod(value)}
                        >
                            <SelectTrigger className="bg-background mr-4 rounded-lg border-2 text-left">
                                <SelectValue
                                    className="px-4"
                                    placeholder="Select your method"
                                />
                            </SelectTrigger>
                            <SelectContent
                                className="placeholder:text-muted-foreground h-[25vh] overflow-y-auto"
                                onCloseAutoFocus={(e) => e.preventDefault()}
                            >
                                {Object.entries(AdmissionMethod)?.map(([key, value]) => (
                                    <SelectItem key={key} value={key}>
                                        {value}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <div>
                        <Label className="text-sm font-semibold">
                            Degree Level <span className="text-primary">(required)</span>
                        </Label>
                        <Select
                            value={degreeLevel}
                            onValueChange={(value) => setDegreeLevel(value)}
                        >
                            <SelectTrigger className="bg-background mr-4 rounded-lg border-2 text-left">
                                <SelectValue className="px-4" placeholder="Select your level" />
                            </SelectTrigger>
                            <SelectContent
                                className="placeholder:text-muted-foreground h-[25vh] overflow-y-auto"
                                onCloseAutoFocus={(e) => e.preventDefault()}
                            >
                                {Object.entries(degreeLevels)?.map(([key, value]) => (
                                    <SelectItem key={key} value={key}>
                                        {value}
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
