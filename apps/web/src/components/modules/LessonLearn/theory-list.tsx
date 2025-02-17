import { Theory } from "@highschool/interfaces";
import { Separator } from "@highschool/ui/components/ui/separator";

interface TheoryListProps {
  theories: Theory[];
}

export const TheoryList = ({ theories }: TheoryListProps) => {
  if (theories.length === 0) {
    return null; // Ensure nothing is returned if the list is empty
  }

  return (
    <div className="mx-auto mt-8 flex max-w-4xl flex-col gap-8">
      {theories.map((theory, index) => (
        <div key={theory.id}>
          <div className="mb-4">
            <TheoryItem theory={theory} />
          </div>
          {index !== theories.length - 1 && (
            <div className="my-4">
              <Separator />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

interface TheoryItemProps {
  theory: Theory;
}

const TheoryItem = ({ theory }: TheoryItemProps) => {
  return (
    <div className="flex flex-col gap-2">
      <h2 className="text-2xl font-bold"># {theory.theoryTitle}</h2>
      <div
        dangerouslySetInnerHTML={{ __html: theory.theoryContentHtml }}
        className="py-4 text-lg"
      />
    </div>
  );
};
