import { useSession } from "next-auth/react";

export const useMe = () => {
  const { data: session } = useSession();

  return session?.user;
};
