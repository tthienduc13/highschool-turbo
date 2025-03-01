import { Modal } from "@highschool/components";
import { useContentsBySlugQuery } from "@highschool/react-query/queries";
import { IconLoader2 } from "@tabler/icons-react";
import { useRouter } from "next/navigation";

interface PreviewFlashcardModalProps {
  title: string;
  slug: string;
  isOpen: boolean;
  onClose: () => void;
}

export const PreviewFlashcardModal = ({
  title,
  slug,
  isOpen,
  onClose,
}: PreviewFlashcardModalProps) => {
  const { data, isLoading } = useContentsBySlugQuery({
    slug: slug,
    pageNumber: 1,
    pageSize: 20,
  });

  const router = useRouter();

  return (
    <Modal
      withoutCancel
      buttonLabel="Học ngay"
      isOpen={isOpen}
      title={title}
      onClose={onClose}
      onConfirm={() => {
        router.push(`/study-set/${slug}`);
      }}
    >
      <div className="max-h-[400px] overflow-y-scroll flex flex-col gap-8 mt-5 no-scrollbar  ">
        {isLoading ? (
          <div className="w-full h-10 flex items-center justify-center">
            <IconLoader2 className="animate-spin" size={20} />
          </div>
        ) : data ? (
          data?.map((content) => (
            <div key={content.id} className="flex flex-col gap-2">
              <p className="font-semibold text-sm">
                {content.flashcardContentTerm}
              </p>
              <p className="text-sm">{content.flashcardContentDefinition}</p>
            </div>
          ))
        ) : null}
      </div>
    </Modal>
  );
};
