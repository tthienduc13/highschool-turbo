export type Rarity = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

export type Player = {
  avatar: string;
  displayName: string;
  id: string;
  roomId: string;
  score: number;
  timeAverage: number;
} | null;

export type Avatar = {
  id: string;
  name: string;
  image: string | null;
  rarity: Rarity;
  type: string;
  background: string;
};

export enum AvatarRarity {
  Common = 1,
  Uncommon = 2,
  Rare = 3,
  Epic = 4,
  Legendary = 5,
  Mythic = 6,
  Unique = 7,
  Special = 8,
  Exclusive = 9,
}
