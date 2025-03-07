import { useSession } from "next-auth/react";
import { Switch } from "@highschool/ui/components/ui/switch";
import { useUpdateContainerMutation } from "@highschool/react-query/queries";

import { useContainerContext } from "@/stores/use-container-store";
import { menuEventChannel } from "@/events/menu";
import { useSet } from "@/hooks/use-set";

export const CardsSortingSection = () => {
  const { flashcard } = useSet();
  const authed = useSession().status == "authenticated";

  const enableCardsSorting = useContainerContext((s) => s.enableCardsSorting);
  const setEnableCardsSorting = useContainerContext(
    (s) => s.setEnableCardsSorting,
  );

  const apiEnableCardsSorting = useUpdateContainerMutation();

  return (
    <div className="flex flex-row items-center gap-8">
      <div className="flex w-full flex-col gap-1">
        <div className="text-lg font-bold">Theo dõi tiến độ</div>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Sắp xếp các thẻ ghi nhớ của bạn để theo dõi những gì bạn đã biết và
          những gì đang học. Tắt tính năng theo dõi tiến độ nếu bạn muốn nhanh
          chóng ôn lại các thẻ ghi nhớ.
        </p>
      </div>
      <Switch
        checked={enableCardsSorting}
        onCheckedChange={(check) => {
          if (!authed) {
            menuEventChannel.emit("openSignup", {
              message:
                "Tạo tài khoản miễn phí để theo dõi tiến độ hiệu quả nhất",
            });

            return;
          }

          setEnableCardsSorting(check);
          apiEnableCardsSorting.mutate({
            flashcardId: flashcard.id,
            values: {
              enableCardsSorting: check,
            },
          });
        }}
      />
    </div>
  );
};
