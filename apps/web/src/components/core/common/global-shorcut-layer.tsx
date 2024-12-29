"use client";

import { useSession } from "next-auth/react";

import { useEffect, useState } from "react";

import { menuEventChannel } from "@/events/menu";
import tinykeys from "@/lib/tiny-key";

import { CommandMenu } from "./command-menu";

function GlobalShortcutLayer() {
  const [open, setOpen] = useState(false);
  const session = useSession();

  useEffect(() => {
    const unsub = tinykeys(window, {
      "$mod+k": (e) => {
        if (!session.data?.user) return;

        e.preventDefault();
        setOpen(!open);
      },
    });

    return () => {
      unsub();
    };
  }, [session.data?.user, setOpen, open]);
  return (
    <CommandMenu
      open={open}
      onClose={() => {
        setOpen(false);
        menuEventChannel.emit("commandMenuClosed");
      }}
    />
  );
}

export default GlobalShortcutLayer;
