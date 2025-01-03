import { createSlice, PayloadAction } from '@reduxjs/toolkit';


const initialState: string = ''

const lobbySlice = createSlice({
    name: 'lobbySlice',
    initialState,
    reducers: {
        setLobby: (state, action: PayloadAction<string>) => {
            return action.payload
        },
        clearLobby: () => {
            return ''
        },
    },
})

export const { setLobby, clearLobby } = lobbySlice.actions

export default lobbySlice.reducer