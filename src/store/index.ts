import { combineReducers, configureStore } from "@reduxjs/toolkit";
import noteReducer from "../redux/note/noteSlice";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  persistReducer, persistStore, FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['notes']
}


const rootReducer = combineReducers({
  notes: noteReducer,
})

const persistedNoteReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedNoteReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }),
});

export const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>;