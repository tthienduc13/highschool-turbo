import { Major } from "@highschool/interfaces";
import { useCreateMajorMutation } from "@highschool/react-query/queries";

import { CsvImporter } from "@/components/core/common/csv-importer";

export const ImportMajorButton = () => {
    const { mutate: createMajor } = useCreateMajorMutation();

    return (
        <CsvImporter
            fields={[
                {
                    label: "Major Code",
                    value: "MajorCode",
                },
                {
                    label: "Name",
                    value: "Name",
                },
                {
                    label: "Description",
                    value: "Description",
                },
                {
                    label: "Skill You Learn",
                    value: "SkillYouLearn",
                },
                {
                    label: "Major Category Code",
                    value: "MajorCategoryCode",
                },
            ]}
            onImport={async (parsedData) => {
                const formattedData: Major[] = parsedData.map((item) => ({
                    majorCategoryCode: String(item.MajorCategoryCode),
                    majorCode: String(item.MajorCode),
                    description: String(item.Description),
                    skillYouLearn: String(item.SkillYouLearn),
                    name: String(item.Name),
                }));

                try {
                    createMajor({
                        majors: formattedData,
                    });
                } catch (error) {
                    console.error("Error creating batch of schools", error);
                }
            }}
        />
    );
};
