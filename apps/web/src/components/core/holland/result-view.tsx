import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { useUpdateStudentHollandMutation } from "@highschool/react-query/queries";
import { Button } from "@highschool/ui/components/ui/button";
import { IconLoader2 } from "@tabler/icons-react";

import { menuEventChannel } from "@/events/menu";
import { useHollandTestContext } from "@/stores/use-holland-test-store";

export const ResultView = () => {
  const result = useHollandTestContext((s) => s.result);
  const hollandType = useHollandTestContext((s) => s.hollandType);
  const [activeTab, setActiveTab] = useState<string | null>(null);
  const queryClient = useQueryClient();

  const updateStudent = useUpdateStudentHollandMutation();

  const handleSave = async () => {
    await updateStudent.mutateAsync(hollandType, {
      onSuccess: () => {
        toast.success("Đã lưu kết quả");

        queryClient.invalidateQueries({
          queryKey: ["orientation-status"],
        });
        menuEventChannel.emit("openCareerGuidanceModal");
      },
    });
  };

  useEffect(() => {
    if (result && result.length > 0 && !activeTab) {
      setActiveTab(result[0]?.title || null);
    }
  }, [result, activeTab]);

  if (!result) return null;

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-y-5">
      <div className="flex flex-row items-center justify-start">
        <h1 className="text-2xl font-bold">Kết quả bài định hướng</h1>
      </div>
      <div className="relative mt-5 w-full">
        <div className="flex flex-row items-center border-b-2 py-2">
          {result?.map((item) => (
            <button
              key={item.title}
              className={`w-1/3 cursor-pointer text-center ${activeTab === item.title ? "font-bold text-blue-700" : ""}`}
              onClick={() => setActiveTab(item.title)}
            >
              {item.title}
            </button>
          ))}
        </div>
      </div>
      <div className="py-5">
        {activeTab && result.find((item) => item.title === activeTab) && (
          <div className="flex flex-col gap-y-4">
            <h2 className="text-2xl font-bold">{activeTab}</h2>
            <p>
              {result.find((item) => item.title === activeTab)?.description}
            </p>
            <div className="grid grid-cols-2 gap-5">
              <div>
                <h3 className="text-lg font-bold">Nhóm chuyên ngành</h3>
                <ul className="mt-2 list-inside list-disc space-y-2">
                  {result
                    .find((item) => item.title === activeTab)
                    ?.majors.map((item) => <li key={item}>{item}</li>)}
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-bold">Nhóm nghề</h3>
                <ul className="mt-2 list-inside list-disc space-y-2">
                  {result
                    .find((item) => item.title === activeTab)
                    ?.relatedPathways.map((item) => <li key={item}>{item}</li>)}
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="mt-4 flex items-center justify-end">
        <Button disabled={updateStudent.isPending} onClick={handleSave}>
          {updateStudent.isPending ? (
            <IconLoader2 className="animate-spin" size={18} />
          ) : (
            "Lưu kết quả"
          )}
        </Button>
      </div>
    </div>
  );
};
