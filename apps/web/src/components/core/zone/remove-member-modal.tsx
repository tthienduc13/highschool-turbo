"use client";

import { Modal } from "@highschool/components";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@highschool/ui/components/ui/alert";
import { IconInfoTriangle } from "@tabler/icons-react";

import { useZone } from "@/hooks/use-zone";

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
  const { data: zone } = useZone();
  //   const removeMember = api.organizations.removeMember.useMutation({
  //     onSuccess: async () => {
  //       onClose();
  //       await utils.organizations.get.invalidate();
  //     },
  //   });

  return (
    <Modal
      buttonVariant="destructive"
      isOpen={isOpen}
      title={type == "user" ? "Xoá người dùng" : "Cấm người dùng"}
      onClose={onClose}
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
      {/* <Modal.Content>
        <Modal.Body spacing="2">
          <Modal.Heading>
            {type == "user" ? "Remove member" : "Remove invite"}
          </Modal.Heading>
          <Text>
            Are you sure you want to{" "}
            {type == "user"
              ? "remove this member from the organization"
              : "cancel this invite to the organization"}
            ?
          </Text>
        </Modal.Body>
        <Modal.Divider />
        <Modal.Footer>
          <ButtonGroup>
            <Button variant="ghost" onClick={onClose}>
              Cancel
            </Button>
            <Button
              isLoading={removeMember.isLoading}
              onClick={() =>
                removeMember.mutate({
                  orgId: org!.id,
                  genericId: id,
                  type,
                })
              }
            >
              {type == "user" ? "Remove member" : "Remove invite"}
            </Button>
          </ButtonGroup>
        </Modal.Footer>
      </Modal.Content> */}
    </Modal>
  );
};
