"use client";

import { useSession } from "next-auth/react";
import { useState } from "react";
import dynamic from "next/dynamic";
import { Button } from "@highschool/ui/components/ui/button";
import {
  IconLoader2,
  IconPlus,
  IconPrinter,
  IconShare,
  IconTableExport,
  TablerIcon,
} from "@tabler/icons-react";

import { Hint } from "../common/hint";

import { menuEventChannel } from "@/events/menu";

const AddToFolderModal = dynamic(
  () => import("./add-to-folder-modal").then((mod) => mod.AddToFolderModal),
  {
    ssr: false,
  },
);

const ExportTermModal = dynamic(
  () => import("./export-term-modal").then((mod) => mod.ExportTermModal),
  {
    ssr: false,
  },
);

export const ActionArea = () => {
  const [addToFolder, setAddToFolder] = useState(false);
  //   const [share, setShare] = useState(false);
  const [shouldPrint, setShouldPrint] = useState(false);
  const [exportOpen, setExportOpen] = useState(false);

  // const handlePrint = useReactToPrint({
  //     content: () => printRef.current,
  //     onAfterPrint: () => {
  //         setShouldPrint(false);
  //     },
  // });
  return (
    <>
      {addToFolder && (
        <AddToFolderModal
          isOpen={addToFolder}
          onClose={async () => {
            setAddToFolder(false);
          }}
        />
      )}
      <ExportTermModal
        isOpen={exportOpen}
        onClose={() => setExportOpen(false)}
      />
      <div className="flex w-fit flex-row divide-x-[1px] overflow-hidden rounded-lg border">
        <ActionButton
          icon={IconPlus}
          label="Thêm vào thư mục"
          unauthedMessage="Tạo tài khoản miễn phí để tạo thư mục và lưu trữ bộ thẻ ghi nhớ"
          onClick={() => setAddToFolder(true)}
        />
        <ActionButton
          icon={IconShare}
          label="Chia sẻ"
          //   onClick={() => setShare(true)}
        />
        <ActionButton
          icon={IconPrinter}
          isLoading={shouldPrint}
          label="Print"
          onClick={() => {
            setShouldPrint(true);
            requestAnimationFrame(() => {
              // handlePrint();
            });
          }}
        />
        <ActionButton
          icon={IconTableExport}
          label="Xuất ra"
          onClick={() => setExportOpen(true)}
        />
      </div>
    </>
  );
};

interface ActionButtonProps {
  label: string;
  icon: TablerIcon;
  onClick?: () => void;
  isLoading?: boolean;
  unauthedMessage?: string;
  unauthedCallbackUrl?: string;
}

export const ActionButton: React.FC<ActionButtonProps> = ({
  label,
  icon,
  onClick,
  isLoading,
  unauthedMessage,
  unauthedCallbackUrl,
}) => {
  const authed = useSession().status == "authenticated";
  const Icon = icon;

  const unauthedHandler = () => {
    menuEventChannel.emit("openSignup", {
      message: unauthedMessage,
      callbackUrl: unauthedCallbackUrl,
    });
  };

  return (
    <Hint label={label} side="bottom">
      <Button
        aria-label={label}
        className="rounded-none"
        disabled={isLoading}
        size={"icon"}
        variant={"ghost"}
        onClick={authed || !unauthedMessage ? onClick : unauthedHandler}
      >
        {isLoading ? (
          <IconLoader2 className="animate-spin" />
        ) : (
          <Icon className="!size-[18px]" />
        )}
      </Button>
    </Hint>
  );
};
