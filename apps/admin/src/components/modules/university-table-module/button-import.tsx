import { useCreateUniversityListMutation } from "@highschool/react-query/queries";
import { UniversityCreate } from "@highschool/interfaces";

import { CsvImporter } from "@/components/core/common/csv-importer";

export const ImportUniversityButton = () => {
    const { mutate: createUniversityList, isPending } =
        useCreateUniversityListMutation();

    return (
        <CsvImporter
            disabled={isPending}
            fields={[
                {
                    label: "UniCode",
                    value: "uniCode",
                },
                {
                    label: "University Name",
                    value: "name",
                },
                {
                    label: "Description",
                    value: "description",
                },
                {
                    label: "Logo URL",
                    value: "logoUrl",
                },
                {
                    label: "City",
                    value: "city",
                },
                {
                    label: "News Details",
                    value: "newsDetails",
                },
                {
                    label: "Admission Details",
                    value: "admissionDetails",
                },
                {
                    label: "Program Details",
                    value: "programDetails",
                },
                {
                    label: "Field Details",
                    value: "fieldDetails",
                },
                {
                    label: "Tags",
                    value: "tags",
                },
            ]}
            onImport={async (parsedData) => {
                const formattedData: UniversityCreate[] = parsedData.map((item) => ({
                    uniCode: String(item.uniCode),
                    name: String(item.name),
                    description: String(item.description),
                    logoUrl: String(item.logoUrl),
                    city: Number(item.city),
                    newsDetails: String(item.newsDetails),
                    admissionDetails: String(item.admissionDetails),
                    programDetails: String(item.programDetails),
                    fieldDetails: String(item.fieldDetails),
                    tags: Array.isArray(item.tags) ? item.tags.map(String) : [],
                }));

                try {
                    createUniversityList(formattedData);
                } catch (error) {
                    console.error("Error creating batch of universities", error);
                }
            }}
        />
    );
};
