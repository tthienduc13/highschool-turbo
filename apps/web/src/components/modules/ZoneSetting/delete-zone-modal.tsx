"use client";

import { Modal } from "@highschool/components";
import { useDeleteZoneMutation } from "@highschool/react-query/queries";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@highschool/ui/components/ui/alert";
import { IconInfoTriangle } from "@tabler/icons-react";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";

export interface DeleteZoneModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DeleteZoneModal: React.FC<DeleteZoneModalProps> = ({
  isOpen,
  onClose,
}) => {
  const params = useParams();
  const router = useRouter();

  const apiDeleteZone = useDeleteZoneMutation();

  const handleRemoveMember = () => {
    apiDeleteZone.mutate(
      {
        zoneId: params.id as string,
      },
      {
        onSuccess: async (data) => {
          toast.success(data.message);
          onClose();
          router.push("/");
        },
      },
    );
  };

  return (
    <Modal
      buttonVariant="destructive"
      isOpen={isOpen}
      isPending={apiDeleteZone.isPending}
      title={"Rời khỏi zone"}
      onClose={onClose}
      onConfirm={handleRemoveMember}
    >
      <Alert className="mb-6" variant="destructive">
        <AlertTitle className="flex flex-row items-center gap-2">
          <IconInfoTriangle />
          <p className="text-xl font-semibold">Xoá Zone này?</p>
        </AlertTitle>
        <AlertDescription>
          Việc này sẽ không thể hoàn tác. Bạn có chắc chắn muốn xoá luôn zone
          này không?
        </AlertDescription>
      </Alert>
    </Modal>
  );
};
