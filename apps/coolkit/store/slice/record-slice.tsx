import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type PlayerRecord = {
  question: number;
  answers: {
    userId: string;
    answer: string;
    isCorrect: boolean;
    time: number;
    score: number;
  }[];
};

const initialState: PlayerRecord[] = [];

const recordSlice = createSlice({
  name: "playerSlice",
  initialState,
  reducers: {
    addRecord: (state, action: PayloadAction<PlayerRecord>) => {
      state.push(action.payload);
    },
    clearRecord: (state) => {
      state = [];
    },
  },
});

export const { addRecord, clearRecord } = recordSlice.actions;

export default recordSlice.reducer;
