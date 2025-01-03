import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { Player } from "@/api/user/type";

const initialState: Player | null = null as Player;

const playerSlice = createSlice({
  name: "playerSlice",
  initialState,
  reducers: {
    setPlayer: (state, action: PayloadAction<Player>) => {
      return action.payload;
    },
    clearPlayer: (state) => {
      return null;
    },
    updatePlayerInfo: (state, action: PayloadAction<Partial<Player>>) => {
      if (state) {
        return { ...state, ...action.payload };
      }
      return state;
    },
  },
});

export const { setPlayer, clearPlayer, updatePlayerInfo } = playerSlice.actions;

export default playerSlice.reducer;
