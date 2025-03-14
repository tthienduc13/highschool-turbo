import { ContentAI, ResponseModel } from "@highschool/interfaces";
import axios from "axios";

export const generateAIContent = async (
  contentAI: ContentAI,
): Promise<ResponseModel<object>> => {
  const reponse = await axios.post(
    "https://fai-ai.azurewebsites.net/api/v1/write",
    contentAI,
  );

  return reponse.data;
};
