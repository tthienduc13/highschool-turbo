import { useMutation } from "@tanstack/react-query";

import { uploadUserImage } from "../apis/cloudinary";

export const useUploadUserImageMutation = () => {
  return useMutation({
    mutationFn: uploadUserImage,
    onSuccess: (data) => {
      return data;
    },
    onError: (error) => {
      return error;
    },
  });
};
