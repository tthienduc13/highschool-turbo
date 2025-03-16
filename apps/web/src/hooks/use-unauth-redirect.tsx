import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { env } from "@highschool/env";

export const useUnauthedRedirect = () => {
  const { data: session, status } = useSession();
  const isLoading = status === "loading";
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !session) {
      const params = new URLSearchParams();

      params.set(
        "callbackUrl",
        `${env.NEXT_PUBLIC_APP_URL}${pathname}${searchParams.toString() ? `?${searchParams.toString()}` : ""}`,
      );
      router.replace(`/sign-in?${params.toString()}`);
    }
  }, [isLoading, session, pathname, searchParams, router]);
};
