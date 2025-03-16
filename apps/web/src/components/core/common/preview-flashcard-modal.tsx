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
      <div className="no-scrollbar mt-5 flex max-h-[400px] flex-col gap-8 overflow-y-scroll  ">
        {isLoading ? (
          <div className="flex h-10 w-full items-center justify-center">
            <IconLoader2 className="animate-spin" size={20} />
          </div>
        ) : data ? (
          data?.map((content) => (
            <div key={content.id} className="flex flex-col gap-2">
              <p className="text-sm font-semibold">
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
