import {
    AdmissionMethod,
    DegreeLevel,
    UniversityMajor,
} from "@highschool/interfaces";
import { useCreateUniversityMajorListMutation } from "@highschool/react-query/queries";
import { toast } from "sonner";

import { CsvImporter } from "@/components/core/common/csv-importer";

export const ImportUniversityMajorButton = ({
    uniCode,
}: {
    uniCode: string;
}) => {
    const { mutate: createUniversityMajor } =
        useCreateUniversityMajorListMutation();

    const isAdmissionMethod = (majorCode: string) => {
        return Object.values(AdmissionMethod).includes(
            majorCode as AdmissionMethod,
        );
    };

    const isDegreeLevel = (degreeLevel: string) => {
        return Object.values(DegreeLevel).includes(degreeLevel as DegreeLevel);
    };

    return (
        <CsvImporter
            fields={[
                {
                    label: "UniCode",
                    value: "uniCode",
                },
                {
                    label: "Major Code",
                    value: "majorCode",
                },
                {
                    label: "Admission Method",
                    value: "admissionMethod",
                },
                {
                    label: "Quota",
                    value: "quota",
                },
                {
                    label: "Degree Level",
                    value: "degreeLevel",
                },
            ]}
            onImport={async (parsedData) => {
                const formattedData: UniversityMajor[] = [];

                for (const item of parsedData) {
                    if (!isAdmissionMethod(String(item.admissionMethod))) {
                        toast.error("Admission method is invalid");

                        return;
                    } else if (!isDegreeLevel(String(item.degreeLevel))) {
                        toast.error("Degree level is invalid");

                        return;
                    }

                    formattedData.push({
                        uniCode: String(item.uniCode === "" ? uniCode : item.uniCode),
                        majorCode: String(item.majorCode ?? ""),
                        admissionMethods: String(item.admissionMethod),
                        quota: Number(item.quota),
                        degreeLevel: String(item.degreeLevel),
                    });
                }

                try {
                    if (formattedData.length > 0) {
                        createUniversityMajor({
                            universityMajorList: formattedData,
                        });
                    }
                } catch (error) {
                    console.error("Error creating batch of schools", error);
                }
            }}
        />
    );
};
