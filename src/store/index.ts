import { configureStore } from "@reduxjs/toolkit";
import animeReducer from "./slices/animeSlice";

export const store = configureStore({
  reducer: {
    anime: animeReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export { useAppDispatch, useAppSelector } from "./hooks";

export {
  searchAnime,
  fetchAnimeById,
  setSearchQuery,
  setCurrentPage,
  setFilter,
  resetFilters,
  clearAnimeList,
  clearError,
  clearSelectedAnime,
} from "./slices/animeSlice";
