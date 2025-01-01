import { useMutation } from "@tanstack/react-query";

import { login } from "../apis/auth.ts";

export const useSignInMutation = () => {
  return useMutation({
    mutationKey: ["login"],
    mutationFn: login,
  });
};
