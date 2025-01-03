import { Player } from '@/api/user/type';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type PlayersState = ReadonlyArray<Player>;

const initialState: PlayersState = [];

const playersSlice = createSlice({
    name: 'playersSlice',
    initialState,
    reducers: {
        setPlayers: (state, action: PayloadAction<Player[]>) => {
            return action.payload
        },
        clearPlayers: () => {
            return []
        },
        updatePlayerInfoOnList: (state, action: PayloadAction<Partial<Player> & { id: string }>) => {
            const { id, ...updates } = action.payload;
            return state.map(player =>
                player?.id === id ? { ...player, ...updates } : player
            );
        },
        addOrUpdatePlayer: (state, action: PayloadAction<Player>) => {
            const newPlayer = action.payload;
            const existingIndex = state.findIndex(player => player?.id === newPlayer?.id);

            if (existingIndex >= 0) {
                // update player if existing
                const updatedState = [...state];
                updatedState[existingIndex] = newPlayer;
                return updatedState;
            } else {
                // add player if not existing
                return [...state, newPlayer];
            }
        },
        removePlayer: (state, action: PayloadAction<string>) => {
            const playerId = action.payload;
            return state.filter(player => player?.id !== playerId);
        },
    },
});

export const { setPlayers, clearPlayers, updatePlayerInfoOnList, addOrUpdatePlayer, removePlayer } =
    playersSlice.actions;

export default playersSlice.reducer;
export const selectPlayerCount = (state: { players: Player[] }) => state.players ? state.players.length : 0;
