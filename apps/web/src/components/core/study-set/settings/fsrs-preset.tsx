import { useSession } from "next-auth/react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@highschool/ui/components/ui/select";
import {
  useGetFsrsQuery,
  useUpdateFlashcardPresetMutation,
} from "@highschool/react-query/queries";
import { IconLoader2, IconProgressHelp } from "@tabler/icons-react";
import Link from "next/link";

import { Hint } from "../../common/hint";

import { useContainerContext } from "@/stores/use-container-store";
import { useSet } from "@/hooks/use-set";

export const FSRSPreset = () => {
  const { status } = useSession();
  const { flashcard } = useSet();

  const { data, isLoading } = useGetFsrsQuery({
    pageNumber: 1,
    pageSize: 999,
    search: "",
  });

  const presetId = useContainerContext((s) => s.presetId);
  const setPresetId = useContainerContext((s) => s.setPresetId);

  const apiUpdatePreset = useUpdateFlashcardPresetMutation();

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:gap-8">
      <div className="flex w-full flex-col gap-0">
        <div className="flex flex-row gap-2">
          <p className="font-bold">FSRS Preset</p>
          <Link href={"/about-fsrs"} target="_blank">
            {" "}
            <Hint label="Tìm hiểu thêm">
              <IconProgressHelp
                className="cursor-pointer text-blue-700 transition-transform duration-200 hover:scale-110 dark:text-blue-300"
                size={20}
              />
            </Hint>
          </Link>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Cá nhân hoá thẻ ghi nhớ của bạn với FSRS Preset
        </p>
      </div>
      <div className="w-60">
        <Select
          disabled={isLoading}
          value={presetId}
          onValueChange={(value) => {
            setPresetId(value);

            if (status == "authenticated")
              apiUpdatePreset.mutate({
                flashcardId: flashcard.id,
                presetId: value,
              });
          }}
        >
          <SelectTrigger className="h-10 w-48 border-gray-200 bg-white text-base focus-visible:ring-0 dark:border-gray-800/50 dark:bg-gray-800">
            <SelectValue className="text-base" placeholder="Chọn thông số">
              {data?.data.find((item) => item.id === presetId)?.title}
            </SelectValue>
          </SelectTrigger>
          <SelectContent className="border-gray-200 bg-gray-100 dark:border-gray-800/50 dark:bg-gray-800">
            {isLoading ? (
              <div className="size-full h-10 items-center justify-center">
                <IconLoader2 />
              </div>
            ) : (
              data?.data?.map((option) => (
                <SelectItem
                  key={option.id}
                  className="text-base"
                  value={option.id!}
                >
                  {option.title}
                </SelectItem>
              ))
            )}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};
