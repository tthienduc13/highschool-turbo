import { useRoadMapContext } from "@/stores/use-roadmap-store";
import { useGetNodeResourceQuery } from "@highschool/react-query/queries";
import { Badge } from "@highschool/ui/components/ui/badge";
import { IconLoader2 } from "@tabler/icons-react";
import { useReactFlow } from "@xyflow/react";
import Link from "next/link";

interface SpecificResourceProps {
  selectedNodeId: string;
}

export const SpecificResource = ({ selectedNodeId }: SpecificResourceProps) => {
  const { getNode } = useReactFlow();
  const currentNode = getNode(selectedNodeId);
  const activeTab = useRoadMapContext((s) => s.activeTab);

  const resourceId = currentNode?.data.resourceId as string;
  const isDisabled =
    !selectedNodeId || activeTab === "general" || currentNode?.type === "init";

  const { data, isLoading } = useGetNodeResourceQuery({
    resourceId: resourceId,
    disabled: isDisabled,
  });

  if (isLoading) {
    return (
      <div className="flex h-5 w-full items-center justify-center">
        <IconLoader2 className="animate-spin" />
      </div>
    );
  }

  if (!data) {
    return (
      <div className="mx-auto my-auto text-xl font-bold">
        Phần này không có tài liệu
      </div>
    );
  }
  return (
    <>
      <div className="flex flex-row justify-between">
        <div className="text-xl font-bold">Tài liệu phần này</div>
        {data.typeDocument ? (
          <Badge>
            {data?.typeDocument === "document"
              ? "Tài liệu"
              : data?.typeDocument === "subject"
                ? "Khoá học"
                : data?.typeDocument === "flashcard"
                  ? "Thẻ ghi nhớ"
                  : null}
          </Badge>
        ) : null}
      </div>
      {data.slug && (
        <Link
          href={
            data?.typeDocument === "document"
              ? `document/${data.slug}`
              : data?.typeDocument === "subject"
                ? `/course/${data.slug}`
                : `/study-set/${data?.slug}`
          }
        >
          <div className="mt-3 flex flex-col gap-y-2">
            <div className="text-base font-bold">Tài liệu chính</div>
            <div className="flex flex-col rounded-lg border border-l-2 border-l-blue p-2">
              <p className="line-clamp-2 font-medium">{data?.title}</p>
              <p className="line-clamp-1 text-xs">{data?.description}</p>
            </div>
          </div>
        </Link>
      )}

      {data.relationDocument?.length > 0 ? (
        <div className="mt-3 flex flex-col gap-y-2">
          <div className="text-base font-bold">Tài liệu liên quan</div>
          <div className="flex flex-col gap-1">
            {data.relationDocument.map((document) => (
              <Link
                key={document.id}
                className="underline"
                href={
                  data?.typeDocument === "document"
                    ? `document/${document.slug}`
                    : data?.typeDocument === "subject"
                      ? `/course/${document.slug}`
                      : `/study-set/${document?.slug}`
                }
              >
                {document.name}
              </Link>
            ))}
          </div>
        </div>
      ) : (
        <div className="text-base font-bold">Không có tài liệu liên quan</div>
      )}
    </>
  );
};
