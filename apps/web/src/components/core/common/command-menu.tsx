import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { useSession } from "next-auth/react";
import { useTheme } from "next-themes";
import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useShortcut } from "@highschool/hooks";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@highschool/ui/components/ui/dialog";
import { Input } from "@highschool/ui/components/ui/input";
import { cn } from "@highschool/ui/lib/utils";
import {
  IconFolder,
  IconHome,
  IconLink,
  IconLoader2,
  IconMoon,
  IconPlus,
  IconSearch,
  IconSun,
  IconUser,
} from "@tabler/icons-react";

import { menuEventChannel } from "@/events/menu";
import useColorMode from "@/hooks/use-color-mode";

type EntityType = "set" | "folder";

interface Entity {
  id: string;
  name: string;
  entityType: EntityType;
  viewedAt: Date;
}

export interface CommandMenuProps {
  open: boolean;
  onClose: () => void;
}

export interface MenuOption {
  icon: React.ReactNode;
  name: string;
  searchableName?: string;
  label?: string;
  action: (ctrl: boolean) => void | Promise<void>;
  sortableDate?: Date;
  entity?: Entity;
  shouldShow?: () => boolean;
  loadable?: boolean;
  isLoading?: boolean;
}

export const CommandMenu = ({ open, onClose }: CommandMenuProps) => {
  const pathName = usePathname();
  const router = useRouter();
  const { theme, setTheme } = useTheme();

  const session = useSession();

  const onSet = new RegExp(`^/study-set/[^/]+$`).test(pathName);
  const onLearn = new RegExp(`^/course/[^/]+$`).test(pathName);
  const onDocument = new RegExp(`^/document/[^/]+$`).test(pathName);

  const openLink = (link: string, ctrl: boolean) => {
    void (async () => {
      if (ctrl) {
        window.open(link, "_blank");
      } else {
        router.push(link);
      }
    })();
  };

  const [query, setQuery] = useState<string>("");
  const [selectionIndex, setSelectionIndex] = useState<number>(0);
  const [options, setOptions] = useState<MenuOption[]>([]);
  const [ignoreMouse, setIgnoreMouse] = useState<boolean>(false);

  const scrollRef = useRef<HTMLDivElement | null>(null);
  const resultsRef = useRef<(HTMLDivElement | null)[]>([]);

  const dismiss = pathName == `/onboard/command-menu`;

  const filteredOptions: MenuOption[] = options
    .filter((o) => (!!o.shouldShow ? o.shouldShow() : true))
    .filter((e) =>
      (e.searchableName ?? e.name).toLowerCase().includes(query.toLowerCase()),
    );

  useEffect(() => {
    resultsRef.current = resultsRef.current.slice(0, filteredOptions?.length);
  }, [filteredOptions]);

  useEffect(() => {
    setSelectionIndex(0);
  }, [filteredOptions?.length]);

  useEffect(() => {
    if (open) {
      setQuery("");
    }
    setSelectionIndex(0);
  }, [open]);

  const onSubmit = (i: number, ctrl: boolean) => {
    const option = filteredOptions[i]!;

    if (!dismiss || option.name == "Toggle Theme") {
      void (async () => {
        await option.action(ctrl);
      })();
    }

    if (option.loadable) {
      option.isLoading = true;
      setOptions([...options]);

      return;
    }
    onClose();
  };

  useEffect(() => {
    const total: MenuOption[] = [];

    if (onSet) {
      total.push({
        icon: <IconLink />,
        name: "Sao chép đường dẫn",
        label: `Sao chép đường dẫn cho ${onSet ? "bộ thẻ này" : "tệp này"}`,
        action: async () => {
          await navigator.clipboard.writeText(
            "",
            // `${getBaseUrl()}${pathName}`
          );
        },
        // loadable: true
      });
    }

    if (onDocument) {
      total.push({
        icon: <IconLink />,
        name: "Chia sẻ tài liệu",
        label: `Sao chép đường dẫn tài liệu này`,
        action: async () => {
          await navigator.clipboard.writeText(
            "",
            // `${getBaseUrl()}${pathName}`
          );
        },
        // loadable: true
      });
    }

    if (onLearn) {
      total.push({
        icon: <IconLink />,
        name: "Chia sẻ môn học",
        label: `Sao chép đường dẫn môn học này`,
        action: async () => {
          await navigator.clipboard.writeText(
            "",
            // `${getBaseUrl()}${pathName}`
          );
        },
        // loadable: true
      });
    }

    total.push({
      icon: <IconHome className="size-6" />,
      name: "Trang chủ",
      label: "Về trang chủ",
      action: (ctrl) => openLink(`/`, ctrl),
      shouldShow: () => pathName !== `/`,
    });
    total.push({
      icon: <IconUser className="size-6" />,
      name: "Hồ sơ cá nhân",
      label: "Tới hồ sơ cá nhân",
      action: (ctrl) =>
        openLink(`/profile/${session.data?.user.username}`, ctrl),
      shouldShow: () =>
        window.location.pathname !==
        `/profile/${session.data?.user?.username || ""}`,
    });

    total.push({
      icon: <IconPlus className="size-6" />,
      name: "Thẻ ghi nhớ",
      label: "Tạo bộ thẻ mới",
      action: (ctrl) => openLink(`/study-set/create`, ctrl),
      shouldShow: () => !pathName.includes("/study-set/create"),
    });

    total.push({
      icon: theme == "dark" ? <IconSun /> : <IconMoon />,
      name: "Đổi chủ đề",
      label: `Chuyển sang chế độ ${theme == "dark" ? "sáng" : "tối"} `,
      action: () => setTheme(theme === "dark" ? "light" : "dark"),
    });

    total.push({
      icon: <IconFolder className="size-6" />,
      name: "Thư mục",
      label: "Tạo thư mục mới",
      action: () => menuEventChannel.emit("createFolder"),
    });

    // const matchingOptions = total.filter((o) =>
    //   (o.searchableName ?? o.name).toLowerCase().includes(query.toLowerCase()),
    // );

    // if (matchingOptions.length === 0 && query.trim() !== "") {
    //   matchingOptions.push({
    //     icon: <IconSearch className="size-6" />,
    //     name: `Tìm kiếm: "${query}"`,
    //     label: "Tìm kiếm các mục phù hợp",
    //     action: () => {
    //       router.push(`/search?q=${query}`);
    //       // Add search logic here, e.g., API call
    //     },
    //   });
    // }

    if (query.trim() !== "") {
      total.push({
        icon: <IconSearch className="size-6" />,
        name: `Tìm kiếm: "${query}"`,
        label: "Tìm kiếm các mục phù hợp",
        action: () => {
          router.push(`/search?q=${query}`);
          // Add search logic here, e.g., API call
        },
      });
    }

    setOptions(total);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, query]);

  return (
    <Dialog defaultOpen={true} open={open} onOpenChange={onClose}>
      <DialogContent
        aria-describedby={undefined}
        className={cn(
          "gap-0 rounded-xl border-[#E2E8F0] bg-[#f7fafce8] p-0 shadow-xl backdrop-blur-md dark:border-[#2D3748] dark:bg-[#17192399]",
        )}
      >
        <VisuallyHidden>
          <DialogTitle className="hidden">Title</DialogTitle>
        </VisuallyHidden>
        {open && (
          <ShortcutsManager
            filteredOptions={filteredOptions}
            resultsRef={resultsRef}
            scrollRef={scrollRef}
            selectionIndex={selectionIndex}
            setIgnoreMouse={setIgnoreMouse}
            setSelectionIndex={setSelectionIndex}
            onSubmit={(ctrl) => onSubmit(selectionIndex, ctrl)}
          />
        )}
        <div className="border-b-2 border-b-[#E2E8F0] px-7 py-5 dark:border-b-[#2D3748]">
          <Input
            className="border-none p-0 !text-2xl shadow-none outline-none focus-visible:ring-0"
            placeholder="Bạn muốn điều hướng tới đâu?"
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <div
          ref={scrollRef}
          className={cn(
            "command-ease relative my-4 px-4 transition-[height] duration-300",
            filteredOptions.length > 6 ? "overflow-auto" : "overflow-hidden",
          )}
          style={{
            height: !filteredOptions.length
              ? 64
              : 72 * (filteredOptions || []).slice(0, 6).length,
          }}
        >
          {!!filteredOptions.length && (
            <div
              className={cn(
                "command-ease absolute left-0 top-0 h-[72px] w-full px-5 transition duration-300",
                `translate-y-[${selectionIndex * 72}px]`,
              )}
              style={{
                transform: `translateY(${selectionIndex * 72}px)`,
              }}
            >
              <div className="h-full w-full rounded-xl bg-[#e2e8f080] dark:bg-[#2d374880]" />
            </div>
          )}
          {filteredOptions.map((o, i) => (
            <OptionComponent
              key={i}
              icon={o.icon}
              ignoreMouse={ignoreMouse}
              index={i}
              isLoading={o.isLoading}
              label={o.label}
              name={o.name}
              resultsRef={resultsRef}
              selectionIndex={selectionIndex}
              setIgnoreMouse={setIgnoreMouse}
              setSelectionIndex={setSelectionIndex}
              onClick={(e) => onSubmit(i, e.ctrlKey)}
            />
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

interface OptionCompProps {
  index: number;
  icon: React.ReactNode;
  name: string;
  label?: string;
  resultsRef: React.MutableRefObject<(HTMLDivElement | null)[]>;
  selectionIndex: number;
  setSelectionIndex: React.Dispatch<React.SetStateAction<number>>;
  isLoading?: boolean;
  ignoreMouse: boolean;
  setIgnoreMouse: React.Dispatch<React.SetStateAction<boolean>>;
  onClick: React.MouseEventHandler<HTMLDivElement>;
}

const OptionComponent = ({
  index,
  icon,
  name,
  label,
  resultsRef,
  selectionIndex,
  setSelectionIndex,
  isLoading,
  ignoreMouse,
  setIgnoreMouse,
  onClick,
}: OptionCompProps) => {
  const textColor = useColorMode("#4A5568", " #ffffffa3");
  const highlightTextColor = useColorMode("#171923", "#FFFFFFEB");

  const baseColor = useColorMode("#718096", "#A0AEC0");
  const highlightColor = useColorMode("#171923", "#F7FAFC");

  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
    <div
      ref={(el) => {
        resultsRef.current[index] = el;
      }}
      className="relative flex h-[72px] w-full cursor-pointer items-center gap-x-4 p-4"
      onClick={onClick}
      onPointerEnter={() => {
        if (!ignoreMouse) setSelectionIndex(index);
      }}
      onPointerMove={() => {
        setIgnoreMouse(false);
        setSelectionIndex(index);
      }}
    >
      <div
        className={cn(
          "command-ease flex transition-all duration-300",
          selectionIndex === index
            ? "rotate-[-10deg] scale-[1.1]"
            : "rotate-0 scale-100",
        )}
        color={selectionIndex == index ? highlightColor : baseColor}
      >
        {!isLoading ? (
          icon
        ) : (
          <div className="flex h-[24px] w-full items-center justify-center">
            <IconLoader2 className="size-4 animate-spin" />
          </div>
        )}
      </div>
      <div className="w-full space-y-1 overflow-hidden">
        <div
          className={cn(
            "command-ease overflow-hidden text-ellipsis whitespace-nowrap text-lg font-semibold transition-colors duration-300",
          )}
          color={selectionIndex === index ? highlightTextColor : textColor}
        >
          {name}
        </div>
        {label && <div className="text-xs text-gray-600">{label}</div>}
      </div>
    </div>
  );
};

interface ShortcutsManagerProps {
  filteredOptions: MenuOption[];
  selectionIndex: number;
  setSelectionIndex: React.Dispatch<React.SetStateAction<number>>;
  setIgnoreMouse: React.Dispatch<React.SetStateAction<boolean>>;
  resultsRef: React.MutableRefObject<(HTMLDivElement | null)[]>;
  scrollRef: React.MutableRefObject<HTMLDivElement | null>;
  onSubmit: (ctrl: boolean) => void;
}

const ShortcutsManager: React.FC<ShortcutsManagerProps> = ({
  filteredOptions: filteredEvents,
  selectionIndex,
  setSelectionIndex,
  setIgnoreMouse,
  resultsRef,
  scrollRef,
  onSubmit,
}) => {
  const isScrolledIntoView = (el: HTMLDivElement) => {
    const container = scrollRef.current!;

    const rect = el.getBoundingClientRect();
    const { bottom, top } = rect;
    let { height } = rect;

    const containerRect = container.getBoundingClientRect();

    height = height - 72;

    const visible =
      top <= containerRect.top
        ? containerRect.top - top <= height
        : bottom - containerRect.bottom <= height;

    return visible;
  };

  useShortcut(
    ["ArrowDown", "Tab"],
    () => {
      if (!filteredEvents.length) return;

      setIgnoreMouse(true);
      setSelectionIndex((i) => {
        const next = i < filteredEvents.length - 1 ? i + 1 : 0;
        const scrollTo = next;

        if (!isScrolledIntoView(resultsRef.current[scrollTo]!))
          resultsRef.current[scrollTo]!.scrollIntoView(false);

        return next;
      });
    },
    {
      ctrlKey: false,
      shiftKey: false,
    },
  );

  const up = () => {
    if (!filteredEvents.length) return;

    setIgnoreMouse(true);
    setSelectionIndex((i) => {
      const next = i > 0 ? i - 1 : filteredEvents.length - 1;
      const scrollTo =
        next == filteredEvents.length - 1
          ? next
          : Math.max(selectionIndex - 1, 0);

      if (!isScrolledIntoView(resultsRef.current[scrollTo]!))
        resultsRef.current[scrollTo]!.scrollIntoView();

      return next;
    });
  };

  useShortcut(["ArrowUp"], up, {
    ctrlKey: false,
  });
  useShortcut(["Tab"], up, {
    ctrlKey: false,
    shiftKey: "Tab",
  });

  useShortcut(
    ["Enter"],
    () => {
      if (!!filteredEvents.length) onSubmit(false);
    },
    {
      ctrlKey: false,
    },
  );
  useShortcut(
    ["Enter"],
    () => {
      if (!!filteredEvents.length) onSubmit(true);
    },
    {
      ctrlKey: true,
    },
  );

  return <></>;
};
