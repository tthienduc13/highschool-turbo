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

export interface LeaveZoneModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LeaveZoneModal: React.FC<LeaveZoneModalProps> = ({
  isOpen,
  onClose,
}) => {
  const params = useParams();
  const router = useRouter();

  const apiLeaveZone = useDeleteZoneMutation();

  const handleRemoveMember = () => {
    apiLeaveZone.mutate(
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
      isPending={apiLeaveZone.isPending}
      title={"Rời khỏi zone"}
      onClose={onClose}
      onConfirm={handleRemoveMember}
    >
      <Alert className="mb-6" variant="destructive">
        <AlertTitle className="flex flex-row items-center gap-2">
          <IconInfoTriangle />
          <p className="text-xl font-semibold">Bạn có muốn rời khỏi không?</p>
        </AlertTitle>
        <AlertDescription>
          Việc này sẽ không thể hoàn tác. Bạn có chắc chắn muốn rời khỏi zone
          này không?
        </AlertDescription>
      </Alert>
    </Modal>
  );
};
