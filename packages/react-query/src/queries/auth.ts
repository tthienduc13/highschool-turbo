import { useMutation } from "@tanstack/react-query";

import { login, verifyAccount } from "../apis/auth.ts";

export const useSignInMutation = () => {
  return useMutation({
    mutationKey: ["login"],
    mutationFn: login,
  });
};

export const useVerifyAccountMutation = () => {
  return useMutation({
    mutationKey: ["verify-account"],
    mutationFn: verifyAccount,
  });
};
