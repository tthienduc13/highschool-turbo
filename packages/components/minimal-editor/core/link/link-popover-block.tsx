import * as React from "react";
import { Separator } from "@highschool/ui/components/ui/separator";
import { IconExternalLink, IconCopy, IconUnlink } from "@tabler/icons-react";

import { ToolbarButton } from "../toolbar-button";

interface LinkPopoverBlockProps {
  url: string;
  onClear: () => void;
  onEdit: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export const LinkPopoverBlock: React.FC<LinkPopoverBlockProps> = ({
  url,
  onClear,
  onEdit,
}) => {
  const [copyTitle, setCopyTitle] = React.useState<string>("Copy");

  const handleCopy = React.useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      navigator.clipboard
        .writeText(url)
        .then(() => {
          setCopyTitle("Copied!");
          setTimeout(() => setCopyTitle("Copy"), 1000);
        })
        .catch(console.error);
    },
    [url],
  );

  const handleOpenLink = React.useCallback(() => {
    window.open(url, "_blank", "noopener,noreferrer");
  }, [url]);

  return (
    <div className="bg-background flex h-10 overflow-hidden rounded p-2 shadow-lg">
      <div className="inline-flex items-center gap-1">
        <ToolbarButton
          className="w-auto px-2"
          tooltip="Edit link"
          onClick={onEdit}
        >
          Edit link
        </ToolbarButton>
        <Separator orientation="vertical" />
        <ToolbarButton
          tooltip="Open link in a new tab"
          onClick={handleOpenLink}
        >
          <IconExternalLink className="size-4" />
        </ToolbarButton>
        <Separator orientation="vertical" />
        <ToolbarButton tooltip="Clear link" onClick={onClear}>
          <IconUnlink className="size-4" />
        </ToolbarButton>
        <Separator orientation="vertical" />
        <ToolbarButton
          tooltip={copyTitle}
          tooltipOptions={{
            onPointerDownOutside: (e) => {
              if (e.target === e.currentTarget) e.preventDefault();
            },
          }}
          onClick={handleCopy}
        >
          <IconCopy className="size-4" />
        </ToolbarButton>
      </div>
    </div>
  );
};
