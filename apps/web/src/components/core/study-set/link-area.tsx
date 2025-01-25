import { useSession } from "next-auth/react";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { cn } from "@highschool/ui/lib/utils";

import {
  IconBrain,
  IconCards,
  IconGridDots,
  IconLayersSubtract,
  IconLock,
  IconMeteor,
  IconReport,
} from "@tabler/icons-react";

import { menuEventChannel } from "@/events/menu";
import { useSet } from "@/hooks/use-set";

import { Hint } from "../common/hint";

export const LinkArea = () => {
  const { flashcard } = useSet();
  return (
    <div className="grid h-fit w-full grid-cols-2 gap-4 md:grid-cols-3 lg:w-[160px] lg:grid-cols-1">
      <Linkable
        name="Học"
        icon={<IconBrain />}
        href={`/study-set/${flashcard.slug}/learn`}
        requireAuth
      />
      <Linkable
        name="Thẻ"
        icon={<IconCards />}
        href={`/study-set/${flashcard.slug}/flashcards`}
      />
      <Linkable
        name="Kiểm tra"
        icon={<IconReport />}
        href={`/study-set/${flashcard.slug}/test`}
        requireAuth
      />
      <Linkable
        name="Nối"
        icon={<IconLayersSubtract />}
        // href={`/study-set/${flashcard.slug}/match?intro=true`}
        requireAuth
        comingSoon
      />
      <Linkable name="Ô chữ" icon={<IconGridDots />} comingSoon />
      <Linkable name="Gravity" icon={<IconMeteor />} comingSoon />
    </div>
  );
};

interface LinkableProps {
  name: string;
  icon: React.ReactNode;
  href?: string;
  disabled?: boolean;
  requireAuth?: boolean;
  comingSoon?: boolean;
}

export const Linkable: React.FC<LinkableProps> = ({
  name,
  icon,
  href = "",
  disabled = false,
  requireAuth = false,
  comingSoon = false,
}) => {
  const router = useRouter();
  const authed = useSession().status == "authenticated";
  const authEnabled = requireAuth && !authed;
  const Wrapper: React.FC<React.PropsWithChildren> = ({ children }) => {
    if (!comingSoon) return <>{children}</>;

    if (!comingSoon && !authEnabled) return <Link href={href}>{children}</Link>;

    return <Hint label="Sắp ra mắt">{children}</Hint>;
  };

  return (
    <Wrapper>
      <div
        className={cn(
          "group relative cursor-pointer rounded-xl border-b-[3px] border-gray-200 bg-white px-5 py-4 shadow-md transition-all duration-200 ease-in-out hover:-translate-y-2 dark:border-gray-700 dark:bg-gray-800/50",
          !disabled
            ? "hover:border-b-blue-400"
            : "hover:border-b-gray-200 dark:hover:border-b-gray-600",
        )}
        onClick={() => {
          if (authEnabled)
            menuEventChannel.emit("openSignup", {
              message: `Tạo tài khoản để tiếp tục với ${name}`,
              callbackUrl: href,
            });
          else {
            router.push(href);
          }
        }}
      >
        {comingSoon && (
          <div className="absolute -left-3 -top-2 rounded-full bg-gray-50 p-1 text-blue-600 dark:bg-gray-900 dark:text-blue-200">
            <div className="rounded-full bg-white p-[4px] shadow-md dark:bg-gray-800/50">
              <IconLock size={16} />
            </div>
          </div>
        )}

        <div className="flex flex-row items-center gap-3">
          <div className="relative h-6 w-6">
            {/* <div
                            className={cn(
                                "w-full h-full absolute top-1 opacity-30 -left-1 transition-all duration-200 ease-in-out group-hover:-translate-x-[3px] group-focus-within:-translate-x-[3px]  backdrop-blur-3xl",
                                !comingSoon ? "text-blue-400" : "text-gray-600"
                            )}
                        >
                            {icon}
                        </div> */}
            <div className="text-primary relative transition-all duration-200 ease-in-out group-focus-within:-translate-y-[2px] group-hover:-translate-y-[2px]">
              {icon}
            </div>
          </div>
          <p className="font-bold text-gray-600 dark:text-gray-400">{name}</p>
        </div>
      </div>
    </Wrapper>
  );
};
