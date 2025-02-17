import { useSession } from "next-auth/react";

export const useIsTeacher = () => {
  const { data: session } = useSession();

  return session?.user?.roleName?.toLocaleLowerCase() === "teacher";
};

export const useIsStudent = () => {
  const { data: session } = useSession();

  return session?.user?.roleName?.toLocaleLowerCase() === "student";
};
