import Image from "next/image";
import { Modal } from "@highschool/components/modal";
import { Button } from "@highschool/ui/components/ui/button";
import { IconCircleCheck } from "@tabler/icons-react";
import { useCourseCurriculumQuery } from "@highschool/react-query/queries";

interface SelectCurriculumModalProps {
  isOpen: boolean;
  onClose: () => void;
  cousreId: string;
  onSelect: (id: string) => void;
  selectedCurriculumId?: string;
}

export const SelectCurriculumModal = ({
  isOpen,
  cousreId,
  onClose,
  onSelect,
  selectedCurriculumId,
}: SelectCurriculumModalProps) => {
  const { data: CurriculumData } = useCourseCurriculumQuery({
    courseId: cousreId,
  });

  return (
    <Modal
      withoutFooter
      isOpen={isOpen}
      title="Chọn chương trình học "
      onClose={onClose}
    >
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {CurriculumData?.map((curriculum) => (
          <Button
            key={curriculum.id}
            className="relative h-full border-gray-200 dark:border-gray-700"
            variant={"outline"}
            onClick={() => {
              onSelect(curriculum.id);
              onClose();
            }}
          >
            <div className="flex flex-col items-center justify-center">
              <div className="relative h-[80px] w-full">
                <Image
                  fill
                  priority
                  alt={curriculum.curriculumName}
                  sizes="(max-width: 768px) 100vw, 80px"
                  src={curriculum.imageUrl}
                />
              </div>
              <p className="font-medium">{curriculum.curriculumName}</p>
            </div>
            {selectedCurriculumId === curriculum.id && (
              <div className="absolute -right-3 -top-3 rounded-full bg-gray-50 p-1 dark:bg-gray-900">
                <div className="rounded-full bg-white p-[4px] text-emerald-500 shadow-md dark:bg-gray-800/50">
                  <IconCircleCheck className="!size-[18px]" size={18} />
                </div>
              </div>
            )}
          </Button>
        ))}
      </div>
    </Modal>
  );
};
