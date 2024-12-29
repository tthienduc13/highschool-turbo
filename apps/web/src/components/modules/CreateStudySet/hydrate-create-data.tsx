// import { Loading } from "@/components/core/common/loading";
// import { EditorContextLayer } from "@/components/core/editor/editor-context-layer";
// import { DraftData } from "@highschool/interfaces";
// import { useFlashcardDraftQuery } from "@highschool/react-query/queries";
// import { useRouter } from "next/navigation";
// import { useEffect } from "react";
// interface HydrateCreateDataProps {
//     children: React.ReactNode;
// }
// const data: DraftData = {
//     id: "019400d3-14e4-7c1f-f8de-cb472c657b69",
//     userId: "0193d7c9-7b57-7c66-3548-5354da2d35c5",
//     subjectId: "00000000-0000-0000-0000-000000000000",
//     flashcardName: "Tiêu đề",
//     slug: "tieu-e-019400d3-14e4-7c1f-f8de-cb472c657b69",
//     flashcardDescription: "Mô tả được tạo tự động bởi hệ thống",
//     status: "Link",
//     createdBy: "0193d7c9-7b57-7c66-3548-5354da2d35c5",
//     created: false,
//     flashcardContents: [
//         {
//             id: "019400d3-1540-7e5a-31c2-cb6f406ceee8",
//             flashcardId: "019400d3-14e4-7c1f-f8de-cb472c657b69",
//             flashcardContentTerm: "",
//             flashcardContentDefinition: "",
//             image: null,
//             flashcardContentTermRichText: "",
//             flashcardContentDefinitionRichText: "",
//             rank: 0,
//             createdAt: new Date(),
//             updatedAt: new Date(),
//             createdBy: "0193d7c9-7b57-7c66-3548-5354da2d35c5",
//             updatedBy: "0193d7c9-7b57-7c66-3548-5354da2d35c5",
//         },
//         {
//             id: "019400d3-1548-706b-0bfa-5c57da0385a5",
//             flashcardId: "019400d3-14e4-7c1f-f8de-cb472c657b69",
//             flashcardContentTerm: "",
//             flashcardContentDefinition: "",
//             image: null,
//             flashcardContentTermRichText: "",
//             flashcardContentDefinitionRichText: "",
//             rank: 1,
//             createdAt: new Date(),
//             updatedAt: new Date(),
//             createdBy: "0193d7c9-7b57-7c66-3548-5354da2d35c5",
//             updatedBy: "0193d7c9-7b57-7c66-3548-5354da2d35c5",
//         },
//         {
//             id: "019400d3-1549-771a-ec5c-2b01bfd494d3",
//             flashcardId: "019400d3-14e4-7c1f-f8de-cb472c657b69",
//             flashcardContentTerm: "",
//             flashcardContentDefinition: "",
//             image: null,
//             flashcardContentTermRichText: "",
//             flashcardContentDefinitionRichText: "",
//             rank: 2,
//             createdAt: new Date(),
//             updatedAt: new Date(),
//             createdBy: "0193d7c9-7b57-7c66-3548-5354da2d35c5",
//             updatedBy: "0193d7c9-7b57-7c66-3548-5354da2d35c5",
//         },
//     ],
//     numberOfFlashcardContent: 3,
// };
// export const HydrateCreateData = ({ children }: HydrateCreateDataProps) => {
//     return (
//         <EditorContextLayer mode="create" data={data}>
//             {children}
//         </EditorContextLayer>
//     );
// };
import { useEffect } from "react";

import { useRouter } from "next/navigation";

import { useFlashcardDraftQuery } from "@highschool/react-query/queries";

import { EditorContextLayer } from "@/components/core/editor/editor-context-layer";
import { EditorLoading } from "@/components/core/editor/editor-loading";

interface HydrateCreateDataProps {
  children: React.ReactNode;
}

export const HydrateCreateData = ({ children }: HydrateCreateDataProps) => {
  const { data, isLoading, isSuccess } = useFlashcardDraftQuery();
  const router = useRouter();

  useEffect(() => {
    if (isSuccess && data?.status === 400 && typeof data.data === "string") {
      router.replace(`/study-set/${data.data}/edit`);
    }
  }, [data, isSuccess, router]);

  if (isLoading) {
    return <EditorLoading />;
  }

  if (data?.status === 400) {
    return null;
  }

  return (
    <EditorContextLayer mode="create" data={data.data}>
      {children}
    </EditorContextLayer>
  );
};
