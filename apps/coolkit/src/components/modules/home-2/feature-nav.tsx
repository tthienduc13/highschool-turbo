"use client";

import { useRouter } from "next/navigation";

import {
  IconDeviceGamepad,
  IconFolder,
  IconHome,
  IconPlus,
  IconStar,
  IconTrophy,
} from "@tabler/icons-react";

import { ButtonKet } from "@/components/ui/button";

export const FeatureNav = () => {
  const router = useRouter();

  const navItems = [
    { icon: IconHome, label: "Home", color: "#FF6B6B", url: "/" },
    {
      icon: IconTrophy,
      label: "Leaderboard",
      color: "#4ECDC4",
      url: "/leaderboard",
    },
    {
      icon: IconDeviceGamepad,
      label: "Play",
      color: "#19a5ff",
      url: "/play/join",
    },
    { icon: IconPlus, label: "Create", color: "#FF8C42", url: "/kets/create" },
    { icon: IconFolder, label: "My Sets", color: "#845EC2", url: "/my-sets" },
    { icon: IconStar, label: "Favorites", color: "#FFB400", url: "/favorites" },
  ];

  return (
    <nav className="border-b border-gray-200 bg-white">
      <div className="container mx-auto my-2 px-6">
        <div className="flex items-center justify-center gap-4 py-2">
          {navItems.map((item) => (
            <ButtonKet
              key={item.label}
              className="flex-none rounded-xl border-4 border-slate-100 bg-transparent px-6 py-10 hover:bg-gray-100"
              onClick={() => router.push(item.url)}
            >
              <div className="flex flex-col items-center gap-2">
                <item.icon style={{ color: item.color, scale: "1.8" }} />
                <span
                  className="text-[1.1rem] font-medium"
                  style={{ color: item.color }}
                >
                  {item.label}
                </span>
              </div>
            </ButtonKet>
          ))}
        </div>
      </div>
    </nav>
  );
};
