import { useMutation } from "@tanstack/react-query";

import { uploadImage } from "../apis/uploader.ts";

export const useUploaderMutation = () => {
  return useMutation({
    mutationKey: ["upload-image"],
    mutationFn: uploadImage,
  });
};
