import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import sidebarReducer from "./slices/sidebarSlice";
import appealLettersReducer from "./slices/appealLettersSlice";
import calendarReducer from "./slices/calendarSlice";

const rootReducer = combineReducers({
  sidebar: sidebarReducer,
  appealLetters: appealLettersReducer,
  calendar: calendarReducer,
});

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
