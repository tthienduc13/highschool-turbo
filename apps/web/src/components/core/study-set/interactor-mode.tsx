"use client";

import { useSession } from "next-auth/react";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMediaQuery } from "@highschool/hooks";
import { Button } from "@highschool/ui/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@highschool/ui/components/ui/dropdown-menu";
import { cn } from "@highschool/ui/lib/utils";
import {
  IconBrain,
  IconChevronDown,
  IconChevronUp,
  IconPokeball,
  IconRefreshDot,
  IconReport,
  IconWritingSign,
} from "@tabler/icons-react";

import { menuEventChannel } from "@/events/menu";
import { useSet } from "@/hooks/use-set";

export const InteractorModes = () => {
  const isMobile = useMediaQuery("(max-width: 390px)");
  const [openDropdown, setOpenDropdown] = useState<boolean>(false);
  const { flashcard } = useSet();

  return (
    <DropdownMenu open={openDropdown} onOpenChange={setOpenDropdown}>
      <DropdownMenuTrigger asChild>
        <Button
          className={cn("", !isMobile && "!text-base")}
          size={isMobile ? "sm" : "lg"}
        >
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
        sideOffset={20}
      >
        <DropdownMenuGroup>
          <DropdownMenuLabel className="text-base text-gray-800 dark:text-gray-400">
            Hoạt động học tập
          </DropdownMenuLabel>
          <InteractorMode
            requireAuth
            href={`/study-set/${flashcard.slug}/flashcards`}
            icon={<IconBrain />}
            name="Học"
          />
          <InteractorMode
            href={`/study-set/${flashcard.slug}/remembered`}
            icon={<IconRefreshDot />}
            name="Ôn tập"
          />
          <InteractorMode
            requireAuth
            href={`/study-set/${flashcard.slug}/cram`}
            icon={<IconPokeball />}
            name="Học"
          />
          <InteractorMode
            href={`/study-set/${flashcard.slug}/write`}
            icon={<IconWritingSign />}
            name="Viết"
          />
          <InteractorMode
            requireAuth
            href={`/study-set/${flashcard.slug}/test`}
            icon={<IconReport />}
            name="Kiểm tra"
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
        className="text-base"
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
        {icon}
        {name}
      </DropdownMenuItem>
    </Wrapper>
  );
};
