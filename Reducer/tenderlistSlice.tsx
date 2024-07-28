import { API_BASE_URL, TENDERLIST_API_URL } from '../api.config';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

interface TenderListState {
  list: any[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: TenderListState = {
  list: [],
  status: 'idle',
  error: null,
};

export const fetchTenderList = createAsyncThunk(
  'tender/fetchTenderList',
  async (_, { getState }) => {
    const state: any = getState();
    const response = await axios.get(`${API_BASE_URL}${TENDERLIST_API_URL}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response?.data?.data?.data || [];
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
      .addCase(fetchTenderList.fulfilled, (state, action: PayloadAction<any[]>) => {
        state.status = 'succeeded';
        state.list = action.payload;
      })
      .addCase(fetchTenderList.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Something went wrong';
      });
  },
});

export default TenderListSlice.reducer;
