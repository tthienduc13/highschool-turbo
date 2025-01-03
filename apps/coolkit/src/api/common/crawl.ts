import axiosServices from "@/lib/axios";

export const test = async () => {
  const response = await axiosServices.get(
    "https://quizlet.com/715050692/swd392-flash-cards/?funnelUUID=c5e2b70d-a8bd-4752-bf3d-119ba838cdc5",
  );

  return response;
};
