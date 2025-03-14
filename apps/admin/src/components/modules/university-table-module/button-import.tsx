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
                    label: "Region",
                    value: "city",
                },
                {
                    label: "Contact Phone",
                    value: "contactPhone",
                },
                {
                    label: "Contact Email",
                    value: "contactEmail",
                },
                {
                    label: "Website Link",
                    value: "websiteLink",
                },
                {
                    label: "Logo URL",
                    value: "logoUrl",
                },
            ]}
            onImport={async (parsedData) => {
                const formattedData: UniversityCreate[] = parsedData.map((item) => ({
                    uniCode: String(item.uniCode),
                    name: String(item.name),
                    description: String(item.description),
                    region: String(item.city),
                    contactPhone: String(item.contactPhone),
                    contactEmail: String(item.contactEmail),
                    websiteLink: String(item.websiteLink),
                    logoUrl: String(item.logoUrl),
                }));

                try {
                    createUniversityList(formattedData);
                } catch (error) {
                    console.error("Error creating batch of schools", error);
                }
            }}
        />
    );
};
