import { ResponseModel, UploadImagePayload } from "@highschool/interfaces";
import { mediaEndpoints } from "@highschool/endpoints";

import { axiosClientUpload } from "../lib/axios.ts";

export const uploadImage = async (
  payload: UploadImagePayload,
): Promise<ResponseModel<string>> => {
  try {
    const formData = new FormData();

    formData.append("Image", payload.image);
    formData.append("FileName", payload.fileName ?? "");
    formData.append("Folder", payload.folder);
    formData.append("Preset.Name", payload.presetName ?? "");

    const optionalFields = [
      { key: "Preset.Width", value: payload.presetWidth?.toString() },
      { key: "Preset.Height", value: payload.presetHeight?.toString() },
      { key: "Preset.TypeResize", value: payload.typeResize },
      { key: "Preset.Format", value: payload.format },
    ];

    optionalFields.forEach(({ key, value }) => {
      if (value !== undefined) {
        formData.append(key, value);
      }
    });

    const { data } = await axiosClientUpload.post(
      mediaEndpoints.uploadImage,
      formData,
    );

    return data;
  } catch (error) {
    console.error("Error while uploading Image", error);
    throw error;
  }
};
