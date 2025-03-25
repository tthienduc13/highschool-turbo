import { useCreateSchoolMutation } from "@highschool/react-query/queries";

import { CsvImporter } from "@/components/core/common/csv-importer";

export const ImportSchoolButton = () => {
  const { mutate: createSchool, isPending } = useCreateSchoolMutation();

  return (
    <CsvImporter
      disabled={isPending}
      fields={[
        { label: "SchoolName", value: "name" },
        {
          label: "Region Id",
          value: "regionId",
        },
        {
          label: "Location Detail",
          value: "locationDetail",
        },
      ]}
      onImport={async (parsedData) => {
        const formattedData = parsedData.map((item) => ({
          provinceId: Number(item.regionId),
          schoolName: String(item.name ?? ""),
          locationDetail: String(item.locationDetail),
        }));

        try {
          createSchool(formattedData);
        } catch (error) {
          console.error("Error creating batch of schools", error);
        }
      }}
    />
  );
};
