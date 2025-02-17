import { useSession } from "next-auth/react";
import { useEffect } from "react";
import {
  useUpdateBaseUserInfoMutation,
  useUploadUserImageMutation,
} from "@highschool/react-query/queries";

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
      isLoading={uploadUserImage.isPending || updateUserImage.isPending}
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
    />
  );
};
