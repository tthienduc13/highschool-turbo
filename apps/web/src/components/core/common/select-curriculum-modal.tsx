import Image from "next/image";
import { Modal } from "@highschool/components/modal";
import { Button } from "@highschool/ui/components/ui/button";
import {
  useCurriculaQuery,
  useUpdateUserCurriculumMutation,
} from "@highschool/react-query/queries";
import { IconCircleCheck } from "@tabler/icons-react";
import { useQueryClient } from "@tanstack/react-query";
import { useParams } from "next/navigation";

interface SelectCurriculumModalProps {
  isOpen: boolean;
  onClose: () => void;
  courseId: string;
  userCurriculum: string;
}

export const SelectCurriculumModal = ({
  isOpen,
  onClose,
  courseId,
  userCurriculum,
}: SelectCurriculumModalProps) => {
  const { data: CurriculumData } = useCurriculaQuery({
    pageNumber: 1,
    pageSize: 12,
  });
  const { slug } = useParams();
  const queryClient = useQueryClient();
  const apiUpdateUserCurriculum = useUpdateUserCurriculumMutation();

  const filterdCurriculum = CurriculumData?.data.filter(
    (curriculum) => !curriculum.isExternal,
  );

  if (!CurriculumData) return;

  return (
    <Modal
      withoutFooter
      isOpen={isOpen}
      title="Chọn chương trình học của bạn"
      onClose={onClose}
    >
      <div className="grid grid-cols-1 gap-4 pb-6 md:grid-cols-3">
        {filterdCurriculum!.map((curriculum) => (
          <Button
            key={curriculum.id}
            className="relative h-full border-gray-200 dark:border-gray-700"
            variant={"outline"}
            onClick={async () => {
              await apiUpdateUserCurriculum.mutateAsync(
                {
                  curriculumId: curriculum.id,
                  subjectId: courseId,
                },
                {
                  onSuccess: async () => {
                    await queryClient.invalidateQueries({
                      queryKey: ["course", slug],
                    });
                    onClose();
                  },
                },
              );
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
            {userCurriculum === curriculum.id && (
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
