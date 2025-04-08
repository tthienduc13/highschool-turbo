import { CsvImporter } from "@/components/core/common/csv-importer";

interface ImportFlashcardContentButtonExcelProps {
  onImport: (
    data: {
      term: string;
      definition: string;
    }[],
  ) => void;
}

export const ImportFlashcardContentButtonExcel = ({
  onImport,
}: ImportFlashcardContentButtonExcelProps) => {
  return (
    <CsvImporter
      fields={[
        {
          label: "Flashcard Content Term",
          value: "term",
        },
        {
          label: "Flashcard Content Definition",
          value: "definition",
        },
      ]}
      onImport={async (parsedData) => {
        const formattedData = parsedData.map((item) => ({
          term: String(item.flashcardContentTerm ?? ""),
          definition: String(item.flashcardContentDefinition ?? ""),
        }));

        try {
          onImport(formattedData);
        } catch (error) {
          console.error("Error creating batch of schools", error);
        }
      }}
    />
  );
};
