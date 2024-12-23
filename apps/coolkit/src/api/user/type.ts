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
    rarity: string;
    type: string;
    background: string;
}