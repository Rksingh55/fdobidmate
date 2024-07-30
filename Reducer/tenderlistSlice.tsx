import { API_BASE_URL, TENDERLIST_API_URL } from '../api.config';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

interface TenderListState {
  list: any[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  pagination: {
    currentPage: number;
    lastPage: number;
    perPage: number;
    total: number;
  };
}

const initialState: TenderListState = {
  list: [],
  status: 'idle',
  error: null,
  pagination: {
    currentPage: 1,
    lastPage: 1,
    perPage: 6,
    total: 0,
  },
};


export const fetchTenderList = createAsyncThunk(
  'tender/fetchTenderList',
  async (page: number, { getState }) => {
    const response = await axios.get(`${API_BASE_URL}${TENDERLIST_API_URL}`, {
      headers: {
        'Content-Type': 'application/json',
      },
      params: {
        page,
      },
    });
    return response?.data?.data || [];
  }
);

const TenderListSlice = createSlice({
  name: 'TenderList',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTenderList.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchTenderList.fulfilled, (state, action: PayloadAction<any>) => {
        state.status = 'succeeded';
        state.list = action.payload.data || [];
        state.pagination = {
          currentPage: action.payload.current_page,
          lastPage: action.payload.last_page,
          perPage: action.payload.per_page,
          total: action.payload.total,
        };
      })
      .addCase(fetchTenderList.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Something went wrong';
      });
  },
});

export default TenderListSlice.reducer;
