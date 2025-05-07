"use client";

import { Modal } from "@highschool/components";
import { useRemoveMutation } from "@highschool/react-query/queries";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@highschool/ui/components/ui/alert";
import { IconInfoTriangle } from "@tabler/icons-react";
import { useQueryClient } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { toast } from "sonner";

export interface RemoveMemberModalProps {
  isOpen: boolean;
  onClose: () => void;
  id: string;
  type: "user" | "ban";
}

export const RemoveMemberModal: React.FC<RemoveMemberModalProps> = ({
  isOpen,
  onClose,
  id,
  type,
}) => {
  const params = useParams();
  const queryClient = useQueryClient();

  const apiRemoveMember = useRemoveMutation();

  const handleRemoveMember = () => {
    apiRemoveMember.mutate(
      {
        zoneId: params.id as string,
        userId: id,
        email: "example@gmail.com",
        isBanned: false,
      },
      {
        onSuccess: async (data) => {
          await queryClient.invalidateQueries({
            queryKey: ["zone-member", params.id],
          });
          toast.success(data.message);
          onClose();
        },
      },
    );
  };

  return (
    <Modal
      buttonVariant="destructive"
      isOpen={isOpen}
      isPending={apiRemoveMember.isPending}
      title={type == "user" ? "Xoá người dùng" : "Cấm người dùng"}
      onClose={onClose}
      onConfirm={handleRemoveMember}
    >
      <Alert className="mb-6" variant="destructive">
        <AlertTitle className="flex flex-row items-center gap-2">
          <IconInfoTriangle />
          <p className="text-xl font-semibold">
            Bạn có muốn xoá người dùng này không?
          </p>
        </AlertTitle>
        <AlertDescription>
          Việc này sẽ xoá người dùng khỏi Zone của bạn. Bạn có thể thêm lại
          người dùng này vào Zone của bạn bất cứ lúc nào.
        </AlertDescription>
      </Alert>
    </Modal>
  );
};
