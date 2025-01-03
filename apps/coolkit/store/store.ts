import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import playerSlice from './slice/player-slice';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import recordSlice from './slice/record-slice';
import lobbySlice from './slice/lobby-slice';
import playersSlice from './slice/players-slice';

const rootReducer = combineReducers({
    currentPlayerSlice: playerSlice,
    currentRecordSlice: recordSlice,
    currentLobbySlice: lobbySlice,
    listPlayerSlice: playersSlice
});

const persistConfig = {
    key: 'root',
    storage: storage,
    whitelist: ['currentPlayerSlice', 'listPlayerSlice', 'currentRecordSlice', 'currentLobbySlice'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});


export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
