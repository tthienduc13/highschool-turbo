import { useCreateProvincesMutation } from "@highschool/react-query/queries";

import { CsvImporter } from "@/components/core/common/csv-importer";

export const ImportRegionButton = () => {
    const { mutate: createProvince, isPending } = useCreateProvincesMutation();

    return (
        <CsvImporter
            disabled={isPending}
            fields={[
                {
                    label: "Id",
                    value: "id",
                    required: true,
                },
                { label: "Province", value: "name" },
            ]}
            onImport={async (parsedData) => {
                const formattedData = parsedData.map((item) => ({
                    provinceId: Number(item.id),
                    provinceName: String(item.name ?? ""),
                }));

                try {
                    createProvince(formattedData);
                } catch (error) {
                    console.error("Error creating batch of schools", error);
                }
            }}
        />
    );
};
