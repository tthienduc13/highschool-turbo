"use client";

import { useSession } from "next-auth/react";

import { useState } from "react";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { Button } from "@highschool/ui/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@highschool/ui/components/ui/dropdown-menu";

import {
  IconBrain,
  IconCards,
  IconChevronDown,
  IconChevronUp,
  IconGridDots,
  IconLayersSubtract,
  IconMeteor,
  IconReport,
} from "@tabler/icons-react";

import { menuEventChannel } from "@/events/menu";
import { useSet } from "@/hooks/use-set";

export const InteractorModes = () => {
  const [openDropdown, setOpenDropdown] = useState<boolean>(false);
  const { flashcard } = useSet();

  return (
    <DropdownMenu open={openDropdown} onOpenChange={setOpenDropdown}>
      <DropdownMenuTrigger asChild>
        <Button size={"lg"} className="!text-base">
          Chọn chế độ học
          {openDropdown ? (
            <IconChevronUp className="!size-5" />
          ) : (
            <IconChevronDown className="!size-5" />
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="center"
        className="w-full border-gray-200 dark:border-gray-700"
        side="top"
        sideOffset={10}
      >
        <DropdownMenuGroup>
          <DropdownMenuLabel className="text-base text-gray-800 dark:text-gray-400">
            Trò chơi và hoạt động
          </DropdownMenuLabel>
          <InteractorMode
            name="Nối"
            icon={<IconLayersSubtract />}
            // href={`/study-set/${flashcard.slug}/match?intro=true`}
            requireAuth
            comingSoon
          />
          <InteractorMode
            name="Ô chữ"
            icon={<IconGridDots />}
            comingSoon
            requireAuth
          />
          <InteractorMode
            name=" Gravity"
            icon={<IconMeteor />}
            comingSoon
            requireAuth
          />
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuLabel className="text-base text-gray-800 dark:text-gray-400">
            Ôn tập
          </DropdownMenuLabel>
          <InteractorMode
            name="Học"
            icon={<IconBrain />}
            href={`/study-set/${flashcard.slug}/learn`}
            requireAuth
          />
          <InteractorMode
            name="Thẻ"
            icon={<IconCards />}
            href={`/study-set/${flashcard.slug}/flashcards`}
          />
          <InteractorMode
            name="Kiểm tra"
            icon={<IconReport />}
            href={`/study-set/${flashcard.slug}/test`}
            requireAuth
          />
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

interface InteractorModeProps {
  name: string;
  icon: React.ReactNode;
  href?: string;
  disabled?: boolean;
  requireAuth?: boolean;
  comingSoon?: boolean;
}

export const InteractorMode = ({
  name,
  icon,
  href = "",
  //   disabled = false,
  requireAuth = false,
  comingSoon = false,
}: InteractorModeProps) => {
  const router = useRouter();
  const authed = useSession().status == "authenticated";
  const authEnabled = requireAuth && !authed;

  const Wrapper: React.FC<React.PropsWithChildren> = ({ children }) => {
    if (!comingSoon) return <>{children}</>;

    if (!comingSoon && !authEnabled) return <Link href={href}>{children}</Link>;

    return <>{children}</>;
  };
  return (
    <Wrapper>
      <DropdownMenuItem
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
        className="text-base"
      >
        {icon}
        {name}
      </DropdownMenuItem>
    </Wrapper>
  );
};
