import axios from "axios";

import { env } from "@highschool/env";

export const uploadUserImage = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", env.NEXT_PUBLIC_CLOUDINARY_USER_PRESET);

  const response = await axios.post(
    `https://api.cloudinary.com/v1_1/${env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/upload`,
    formData,
  );

  return response.data.secure_url;
};
