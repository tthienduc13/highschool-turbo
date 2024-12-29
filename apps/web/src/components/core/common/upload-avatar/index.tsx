import { useSession } from "next-auth/react";

import { useEffect, useState } from "react";

import {
  useUpdateBaseUserInfoMutation,
  useUploadUserImageMutation,
} from "@highschool/react-query/queries";

import { AnimatedXCircle } from "../animated-icons/animated-x-icon";
import { InnerModal } from "./upload-avatar-modal";

interface UploadAvatarModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const UploadAvatarModal: React.FC<UploadAvatarModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { data: session, update } = useSession();
  // const toast = useToast();

  const uploadUserImage = useUploadUserImageMutation();
  const updateUserImage = useUpdateBaseUserInfoMutation();

  useEffect(() => {
    if (uploadUserImage.isSuccess && uploadUserImage.data) {
      const updateUser = async () => {
        await updateUserImage.mutateAsync({
          profilePicture: uploadUserImage.data,
        });
        console.log(uploadUserImage.data);
        await update({
          ...session,
          user: {
            ...session?.user,
            image: uploadUserImage.data,
          },
        });
        onClose();
      };
      updateUser();
    }
  }, [uploadUserImage.isSuccess, uploadUserImage.data]);

  return (
    <InnerModal
      isOpen={isOpen}
      onClose={onClose}
      onError={() => {
        // toast({
        //     title: error,
        //     status: "error",
        //     colorScheme: "red",
        //     icon: <AnimatedXCircle />,
        //     render: Toast,
        // });
      }}
      onSubmitBuffer={(buffer) => {
        const file = new File([new Blob([buffer])], "avatar.png", {
          type: "image/png",
        });
        uploadUserImage.mutate(file);
      }}
      isLoading={uploadUserImage.isPending || updateUserImage.isPending}
    />
  );
};
