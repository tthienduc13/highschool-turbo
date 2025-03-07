"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { Button } from "@highschool/ui/components/ui/button";
import { Skeleton } from "@highschool/ui/components/ui/skeleton";
import {
  IconChevronDown,
  IconKeyboard,
  IconKeyframes,
} from "@tabler/icons-react";

import { Hint } from "../common/hint";
import { visibilityIcon } from "../common/renderer/visibility-icon";
import { visibilityText } from "../common/renderer/visibility-text";

import { useSetEditorContext } from "@/stores/use-set-editor-store";

const VisibilityModal = dynamic(
  () => import("./visibility-modal").then((mod) => mod.VisibilityModal),
  {
    ssr: false,
  },
);

const ShortcutModal = dynamic(
  () => import("./shorcut-modal").then((mod) => mod.ShortcutModal),
  {
    ssr: false,
  },
);

export interface ButtonAreaProps {
  onImportOpen: () => void;
}

export const ButtonArea = ({ onImportOpen }: ButtonAreaProps) => {
  const visibility = useSetEditorContext((s) => s.visibility);
  const setVisibility = useSetEditorContext((s) => s.setVisibility);

  const [visibilityModalOpen, setVisibilityModalOpen] = useState(false);
  const [shortcutModalOpen, setShortcutModalOpen] = useState(false);

  return (
    <>
      <VisibilityModal
        isOpen={visibilityModalOpen}
        visibility={visibility}
        onChangeVisibility={(v) => {
          setVisibility(v);
        }}
        onClose={() => {
          setVisibilityModalOpen(false);
        }}
      />
      <ShortcutModal
        isOpen={shortcutModalOpen}
        onClose={() => {
          setShortcutModalOpen(false);
        }}
      />
      <div className="flex w-full flex-col items-start justify-between gap-6 md:flex-row md:items-center">
        <Button size={"lg"} variant="outline" onClick={onImportOpen}>
          <IconKeyframes className="!size-[18px]" size={18} />
          Nhập thuật ngữ
        </Button>
        <div className="flex w-full items-center justify-end gap-2">
          <Button
            className="text-base"
            size={"lg"}
            variant="ghost"
            onClick={() => {
              setVisibilityModalOpen(true);
            }}
          >
            {visibilityIcon(visibility, 24)}
            {visibilityText(visibility)}
            <IconChevronDown className="!size-[24px]" />
          </Button>
          <Hint label="Phím tắt" side="bottom">
            <Button
              className="!h-10 !w-10 rounded-full"
              size={"icon"}
              onClick={() => setShortcutModalOpen(true)}
            >
              <IconKeyboard className="!size-6" />
            </Button>
          </Hint>
        </div>
      </div>
    </>
  );
};

ButtonArea.Skeleton = function ButtonAreaSkeleton() {
  return (
    <div className="flex flex-col items-start justify-between space-y-4 md:flex-row md:items-center md:space-x-6 md:space-y-0">
      <div className="flex flex-col items-start space-y-2 sm:flex-row sm:items-center sm:space-x-2 sm:space-y-0">
        <Skeleton className="h-10 w-[120px] rounded-lg" />
      </div>
      <div className="flex w-full items-center justify-end gap-2">
        <Skeleton className="size-10 rounded-full" />
        <Skeleton className="size-10 rounded-full" />
      </div>
    </div>
  );
};
