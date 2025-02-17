import { useQueries } from "@tanstack/react-query";
import Link from "next/link";
import { Course, Document } from "@highschool/interfaces";
import {
  useGetDocumentsQuery,
  useGetSubjectsQuery,
} from "@highschool/react-query/queries";
import { IconLoader2 } from "@tabler/icons-react";

import { useRoadMapContext } from "@/stores/use-roadmap-store";

export const GeneralResource = () => {
  const roadmapData = useRoadMapContext((s) => s.roadmapData);
  const isOpenResource = useRoadMapContext((s) => s.isOpenResoucePanel);
  const activeTab = useRoadMapContext((s) => s.activeTab);

  const queriesResult = useQueries({
    queries: [
      useGetSubjectsQuery({
        subjectIds: roadmapData?.subjectIds || [],
        disabled: isOpenResource && activeTab === "general",
      }),
      useGetDocumentsQuery({
        documentIds: roadmapData?.documentIds || [],
        disabled: isOpenResource && activeTab === "general",
      }),
    ],
  });

  const isLoading = queriesResult.some((query) => query.isLoading);
  const [subjectData, documentData] = [
    queriesResult[0]?.data || null,
    queriesResult[1]?.data || null,
  ];

  return (
    <>
      <div className="flex flex-col">
        <div className="text-xl font-bold">{roadmapData?.name}</div>
        <div className="text-muted-foreground text-justify text-sm">
          {roadmapData?.description}
        </div>
      </div>
      {isLoading ? (
        <div className="mt-4 flex w-full items-center justify-center">
          <IconLoader2 className="animate-spin" />
        </div>
      ) : (
        <>
          <ResourceSection
            data={subjectData ?? []}
            title="Subjects resources"
            type="subject"
          />
          <ResourceSection
            data={documentData ?? []}
            title="Document resources"
            type="document"
          />
        </>
      )}
    </>
  );
};

interface ResourceSectionProps {
  title: string;
  data: Course[] | Document[];
  type: "subject" | "document";
}

const ResourceSection = ({ title, data, type }: ResourceSectionProps) => (
  <div className="mt-4 flex flex-col gap-y-4">
    <div className="flex items-center">
      <div className="w-4 border-t border-green-500" />
      <div className="flex items-center rounded-md border border-green-500 px-2 py-1">
        <span className="text-sm font-medium text-green-500">{title}</span>
      </div>
      <div className="ml-2 flex-grow border-t border-green-500" />
    </div>
    {data && data.length > 0 ? (
      <ul className="list-disc pl-5">
        {data
          .filter((item) => item && item.id)
          .map((item) => (
            <li key={item.id}>
              <Link
                className="font-medium underline"
                href={`/${type}/${itemSlug(item, type)}`}
              >
                {itemName(item, type)}
              </Link>
            </li>
          ))}
      </ul>
    ) : (
      <div>No resources available</div>
    )}
  </div>
);

const itemSlug = (item: Course | Document, type: "subject" | "document") => {
  return type === "subject"
    ? (item as Course)?.slug || ""
    : (item as Document)?.documentSlug || "";
};

const itemName = (item: Course | Document, type: "subject" | "document") => {
  return type === "subject"
    ? (item as Course)?.subjectName || "Unknown Subject"
    : (item as Document)?.documentName || "Unknown Document";
};
