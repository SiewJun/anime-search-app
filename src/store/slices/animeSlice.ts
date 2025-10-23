import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import type { AnimeSearchResponse, AnimeState, AnimeSearchParams } from '../../types/anime';


const JIKAN_API_BASE_URL = 'https://api.jikan.moe/v4';

const jikanApi = axios.create({
  baseURL: JIKAN_API_BASE_URL,
});

const initialState: AnimeState = {
  animeList: [],
  selectedAnime: null,
  loading: false,
  error: null,
  currentPage: 1,
  hasNextPage: false,
  lastVisiblePage: 1,
  totalItems: 0,
  searchQuery: '',
};

export const searchAnime = createAsyncThunk<
  AnimeSearchResponse,
  AnimeSearchParams,
  { rejectValue: string }
>(
  'anime/searchAnime',
  async (params, { rejectWithValue, signal }) => {
    try {
      const queryParams = new URLSearchParams();
      
      if (params.q) queryParams.append('q', params.q);
      if (params.page) queryParams.append('page', params.page.toString());
      if (params.limit) queryParams.append('limit', params.limit.toString());
      if (params.type) queryParams.append('type', params.type);
      if (params.status) queryParams.append('status', params.status);
      if (params.rating) queryParams.append('rating', params.rating);
      if (params.order_by) queryParams.append('order_by', params.order_by);
      if (params.sort) queryParams.append('sort', params.sort);
      
      queryParams.append('sfw', 'true');

      const response = await jikanApi.get<AnimeSearchResponse>(
        `/anime?${queryParams.toString()}`,
        { signal }
      );
      return response.data;
    } catch (error) {
      if (axios.isCancel(error)) {
        throw error;
      }
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data?.message || error.message || 'Failed to fetch anime');
      }
      return rejectWithValue('An unexpected error occurred');
    }
  }
);

const animeSlice = createSlice({
  name: 'anime',
  initialState,
  reducers: {
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    clearAnimeList: (state) => {
      state.animeList = [];
      state.currentPage = 1;
      state.hasNextPage = false;
      state.lastVisiblePage = 1;
      state.totalItems = 0;
    },
    clearError: (state) => {
      state.error = null;
    },
    clearSelectedAnime: (state) => {
      state.selectedAnime = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchAnime.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchAnime.fulfilled, (state, action) => {
        state.loading = false;
        state.animeList = action.payload.data;
        state.currentPage = action.payload.pagination.current_page;
        state.hasNextPage = action.payload.pagination.has_next_page;
        state.lastVisiblePage = action.payload.pagination.last_visible_page;
        state.totalItems = action.payload.pagination.items.total;
        state.error = null;
      })
      .addCase(searchAnime.rejected, (state, action) => {
        if (action.error.name === 'CanceledError') {
          return;
        }
        state.loading = false;
        state.error = action.payload || 'Failed to search anime';
      });
  },
});

export const {
  setSearchQuery,
  setCurrentPage,
  clearAnimeList,
  clearError,
  clearSelectedAnime,
} = animeSlice.actions;

export default animeSlice.reducer;
