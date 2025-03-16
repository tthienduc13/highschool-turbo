import { useFileReader } from "@highschool/hooks";
import { toast } from "sonner";
import {
  HighSchoolAssets,
  ImageFormat,
  ImageResizeMode,
  UploadImagePayload,
} from "@highschool/interfaces";
import { useUploaderMutation } from "@highschool/react-query/queries";

import { AnimatedXCircle } from "@/components/core/common/animated-icons/animated-x-icon";

interface UseLogoUploadOptions {
  onComplete?: (imageUrl: string) => void | Promise<void>;
}

interface FileEvent<T = Element> extends React.FormEvent<T> {
  target: EventTarget & T;
}

export const useLogoUpload = ({ onComplete }: UseLogoUploadOptions) => {
  const [{ result }, setFile] = useFileReader({
    method: "readAsDataURL",
  });

  const apiUpload = useUploaderMutation();

  const uploadComplete = async (imageUrl: string) => {
    try {
      await onComplete?.(imageUrl);
    } catch (error) {
      console.error("Error in upload complete callback:", error);
      throw error;
    }
  };

  const uploadLogo = async (): Promise<string | undefined> => {
    try {
      if (!result) return undefined;

      const fileBlob = await (await fetch(result as string)).blob();
      const fileName = `_${Date.now()}.webp`; // Changed to .webp to match format

      const payload: UploadImagePayload = {
        image: fileBlob as File, // Type assertion since we're converting from blob
        fileName: fileName,
        folder: HighSchoolAssets.Subject,
        presetName: "thumbnail",
        presetWidth: 512,
        presetHeight: 512,
        typeResize: ImageResizeMode.BoxPad,
        format: ImageFormat.WEBP,
      };

      let imageUrl: string | undefined;

      await apiUpload.mutateAsync(payload, {
        onSuccess: (data) => {
          imageUrl = data.data; // Assuming data.data contains the URL
          if (imageUrl) {
            uploadComplete(imageUrl); // Call uploadComplete with the URL
          }
        },
      });

      return imageUrl; // Return the URL after successful upload
    } catch (error) {
      toast.error("Failed to upload logo!", {
        icon: <AnimatedXCircle />,
        style: {
          backgroundColor: "red",
          color: "white",
        },
      });
      console.error("Logo upload error:", error);

      return undefined; // Return undefined on error
    }
  };

  const onInputFile = (e: FileEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) {
      return;
    }

    const limit = 10 * 1000000; // 10MB limit
    const file = e.target.files[0]!;

    if (file.size > limit) {
      toast.error("File vượt quá kích thước! Kích thước tối đa 10MB.", {
        icon: <AnimatedXCircle />,
        style: {
          backgroundColor: "red",
          color: "white",
        },
      });
    } else {
      setFile(file);
    }
  };

  return {
    file: result,
    setFile,
    isPending: apiUpload.isPending,
    onInputFile,
    uploadLogo,
    uploadComplete,
  };
};
