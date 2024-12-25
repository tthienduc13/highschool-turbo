export type Rarity = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9
export type player = {
    userId: string;
    displayName: string;
    roolId: string;
    score: string;
    avatar: string;
    timeAverage: number;
}
export type Avatar = {
    id: string;
    name: string;
    image: string | null;
    rarity: Rarity;
    type: string;
    background: string;
}