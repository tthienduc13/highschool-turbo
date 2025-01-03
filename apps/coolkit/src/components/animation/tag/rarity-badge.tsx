import { Rarity } from "@/api/user/type";

interface RarityBadgeProps {
  rarity: Rarity;
}

export function RarityBadge({ rarity }: RarityBadgeProps) {
  const rarityConfig = {
    1: {
      name: "Common",
      color: "bg-gray-400",
      textColor: "text-gray-100",
      shadow: "shadow-gray-500/20",
    },
    2: {
      name: "Uncommon",
      color: "bg-green-400",
      textColor: "text-green-100",
      shadow: "shadow-green-500/20",
    },
    3: {
      name: "Rare",
      color: "bg-blue-400",
      textColor: "text-blue-100",
      shadow: "shadow-blue-500/20",
    },
    4: {
      name: "Epic",
      color: "bg-purple-400",
      textColor: "text-purple-100",
      shadow: "shadow-purple-500/20",
    },
    5: {
      name: "Legendary",
      color: "bg-yellow-400",
      textColor: "text-yellow-100",
      shadow: "shadow-yellow-500/20",
    },
    6: {
      name: "Chroma",
      color: "bg-pink-400",
      textColor: "text-pink-100",
      shadow: "shadow-pink-500/20",
    },
    7: {
      name: "Unique",
      color: "bg-red-400",
      textColor: "text-red-100",
      shadow: "shadow-red-500/20",
    },
    8: {
      name: "Mythic",
      color: "bg-indigo-400 ",
      textColor: "text-indigo-100",
      shadow: "shadow-indigo-500/20",
    },
    9: {
      name: "Limited",
      color: "bg-amber-400 ",
      textColor: "text-amber-100",
      shadow: "shadow-amber-500/20",
    },
  }[rarity];

  return (
    <div
      className={`absolute -right-2 -top-2 z-10 rounded-full bg-gradient-to-r px-2 py-0.5 text-[0.7rem] font-semibold ${rarityConfig.color} ${rarityConfig.textColor} shadow-lg ${rarityConfig.shadow} animate-pulse backdrop-blur-sm`}
    >
      {rarityConfig.name}
    </div>
  );
}
