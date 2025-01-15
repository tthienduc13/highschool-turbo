"use client";

import { useParams, useRouter } from "next/navigation";

import { useCreateRoomMutation } from "@highschool/react-query/queries";
import { GameButton } from "@highschool/ui/components/ui/game-button";

import { LoadingOverlay } from "@/components/core/commons/loading-overlay";

function HostSettingModule() {
  const params = useParams();

  const router = useRouter();
  const apiCreateRoom = useCreateRoomMutation();

  const handleCreateRoom = async () => {
    apiCreateRoom.mutateAsync(
      { ketId: params.id as string },
      {
        onSuccess: (data) => {
          if (data.status === 201) {
            router.push(`/host/join?id=${data.data?.id}`);
          }
        },
      },
    );
  };
  return (
    <>
      {apiCreateRoom.isPending && (
        <LoadingOverlay message="Đang tạo phòng..." />
      )}
      <div>
        <GameButton onClick={handleCreateRoom}>Bắt đầu</GameButton>
      </div>
    </>
  );
}
export default HostSettingModule;
