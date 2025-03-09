import { useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useReactToPrint } from "react-to-print";
import { toast } from "sonner";
import { useRef, useState } from "react";
import Image from "next/image";
import { Modal } from "@highschool/components/modal";
import { MBTIResult } from "@highschool/interfaces";
import {
  useSaveCachedPersonalityMutation,
  useUpdateStudentMBTIMutation,
} from "@highschool/react-query/queries";
import { Button } from "@highschool/ui/components/ui/button";
import { Input } from "@highschool/ui/components/ui/input";
import {
  IconDownload,
  IconLoader2,
  IconPointFilled,
} from "@tabler/icons-react";

import { ResultPrintComponent } from "./result-print-component";

import { menuEventChannel } from "@/events/menu";
import { useMBTITestContext } from "@/stores/use-mbti-test-store";

export const ResultView = () => {
  const result = useMBTITestContext((s) => s.result);
  const { data: session } = useSession();
  const [shouldPrint, setShouldPrint] = useState<boolean>(false);
  const [openConfirm, setOpenConfirm] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const printRef = useRef(null);
  const mbtiType = useMBTITestContext((s) => s.mbtiType);
  const queryClient = useQueryClient();

  const updateStudent = useUpdateStudentMBTIMutation();
  const savePersonalResult = useSaveCachedPersonalityMutation();

  const handleUpdate = () => {
    updateStudent.mutate(mbtiType, {
      onSuccess: () => {
        toast.success("Đã lưu kết quả");
        queryClient.invalidateQueries({
          queryKey: ["orientation-status"],
        });
        menuEventChannel.emit("openCareerGuidanceModal");
      },
    });
  };

  const handlePrint = useReactToPrint({
    content: printRef.current!,
    onAfterPrint: () => {
      setShouldPrint(false);
    },
  });

  const sections: (keyof Pick<MBTIResult, "advantages" | "disadvantages">)[] = [
    "advantages",
    "disadvantages",
  ];

  if (!result) return;

  return (
    <>
      <Modal
        description="Để xem được bản tóm tắt giúp bạn có thể chọn được ngôi trường phù hợp, hãy nhập vào email của bạn"
        isDisabled={email.length === 0}
        isOpen={openConfirm}
        isPending={savePersonalResult.isPending}
        title="Nhập email của bạn"
        onClose={() => setOpenConfirm(false)}
        onConfirm={() => {
          savePersonalResult.mutate(
            { email: email, mbtiType: mbtiType },
            {
              onSuccess: (data) => {
                toast.success(data.message);
                setOpenConfirm(false);
              },
            },
          );
        }}
      >
        <Input
          className="h-12 w-full border-0 border-b-4 border-b-blue-300  bg-gray-100 pt-2 !text-lg font-bold shadow-none focus-within:border-b-4 focus-visible:border-b-blue-500 focus-visible:ring-0 dark:bg-gray-700 dark:focus-visible:border-blue-300"
          placeholder="Nhập email của bạn"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </Modal>
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-y-5">
        <div className="flex flex-row items-center justify-between">
          <h1 className="text-2xl font-bold">Kết quả bài kiểm tra</h1>
          {session?.user && (
            <Button
              onClick={() => {
                setShouldPrint(true);
                requestAnimationFrame(() => {
                  handlePrint();
                });
              }}
            >
              {shouldPrint ? (
                <IconLoader2 className="animate-spin" />
              ) : (
                <>
                  <IconDownload className="mr-2" size={18} />
                  Tải xuống kết quả
                </>
              )}
            </Button>
          )}
          {shouldPrint && (
            <div style={{ display: "none" }}>
              <ResultPrintComponent ref={printRef} data={result} />
            </div>
          )}
        </div>
        <div className="mt-4 flex flex-col gap-y-2">
          <div className="flex flex-col items-center gap-4 md:flex-row">
            <div className="relative size-[200px] overflow-hidden rounded-full">
              <Image
                fill
                alt={result?.title}
                className="object-cover"
                sizes="200px"
                src={result?.imageUrl}
              />
            </div>
            <h2 className="text-center text-2xl font-semibold md:text-start">
              {result.title}
            </h2>
          </div>
          <div className="text-muted-foreground text-justify">
            {result.description}
          </div>
        </div>
        <div className="flex flex-col gap-8 md:flex-row md:divide-x-2">
          {sections.map((type) => (
            <div key={type} className="flex w-full flex-col gap-y-5 md:px-4">
              <h3 className="scroll-m-20 text-start text-2xl font-semibold tracking-tight md:text-center">
                {type === "advantages" ? "Ưu điểm" : "Nhược điểm"}{" "}
              </h3>
              <ul className="flex flex-col gap-y-2">
                {result[type].map((item, index) => (
                  <li key={index} className="flex flex-row items-start">
                    <IconPointFilled className="mr-2 mt-1 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-4 flex items-center justify-end">
          <Button
            disabled={updateStudent.isPending}
            onClick={session?.user ? handleUpdate : () => setOpenConfirm(true)}
          >
            {updateStudent.isPending ? (
              <IconLoader2 className="animate-spin" size={18} />
            ) : (
              "Lưu kết quả"
            )}
          </Button>
        </div>
      </div>
    </>
  );
};
