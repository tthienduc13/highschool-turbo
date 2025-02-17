import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Modal } from "@highschool/components/modal";
import { Button } from "@highschool/ui/components/ui/button";
import { IconCircleCheck } from "@tabler/icons-react";

interface SelectCurriculumModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CurriculumData = [
  {
    id: "01931f33-7d05-758c-9580-aa477f5249a4",
    curriculumName: "Chân trời sáng tạo",
    image: "/images/curriculum/chan-troi-sang-tao.png",
  },
  {
    id: "01932971-1395-78b7-8033-cd035de9566b",
    curriculumName: "Kết nối tri thức",
    image: "/images/curriculum/ket-noi-tri-thuc.png",
  },
  {
    id: "01932971-336a-747b-d6c8-a28afe4411ba",
    curriculumName: "Cánh diều",
    image: "/images/curriculum/canh-dieu.png",
  },
];

export const SelectCurriculumModal = ({
  isOpen,
  onClose,
}: SelectCurriculumModalProps) => {
  const pathName = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentCurriculum = searchParams.get("curriculum");

  return (
    <Modal
      withoutFooter
      isOpen={isOpen}
      title="Chọn chương trình học của bạn"
      onClose={onClose}
    >
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {CurriculumData.map((curriculum) => (
          <Button
            key={curriculum.id}
            className="relative h-full border-gray-200 dark:border-gray-700"
            variant={"outline"}
            onClick={() => {
              router.replace(`${pathName}?curriculum=${curriculum.id}`);
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
                  src={curriculum.image}
                />
              </div>
              <p className="font-medium">{curriculum.curriculumName}</p>
            </div>
            {currentCurriculum === curriculum.id && (
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
