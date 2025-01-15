import { create } from "zustand";

import { Player } from "@highschool/interfaces";

interface PlayerState {
  player: Player | null;
  lobby: string | "";
  setLobby: (lobby: string) => void;
  setPlayer: (player: Player) => void;
  clearPlayer: () => void;
  updatePlayerInfo: (playerInfo: Partial<Player>) => void;
}

export const usePlayerStore = create<PlayerState>((set) => ({
  player: null,
  lobby: "",
  setLobby: (lobby) => set({ lobby }),
  setPlayer: (player) => set(() => ({ player })),
  clearPlayer: () => set(() => ({ player: null })),
  updatePlayerInfo: (playerInfo) =>
    set((state) => ({
      player: state.player ? { ...state.player, ...playerInfo } : state.player,
    })),
}));
