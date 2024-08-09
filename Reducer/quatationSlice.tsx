import { API_BASE_URL, QUATATION_API_URL } from '../api.config';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

import { getToken } from '../localStorageUtil';

interface QuatationState {
  list: any[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: QuatationState = {
  list: [],
  status: 'idle',
  error: null,
};

export const fetchQuatationList = createAsyncThunk(
  'quatation/fetchQuatationList',
  async (_, { getState }) => {
    const state: any = getState();
    const token = getToken();
    if (!token) {
      console.error('No token found in local storage');
      return;
    }
    const response = await axios.get(`${API_BASE_URL}${QUATATION_API_URL}`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    return response?.data?.data?.data;
  }
);

const currencySlice = createSlice({
  name: 'quatation',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchQuatationList.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchQuatationList.fulfilled, (state, action: PayloadAction<any[]>) => {
        state.status = 'succeeded';
        state.list = action.payload;
      })
      .addCase(fetchQuatationList.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Something went wrong';
      });
  },
});

export default currencySlice.reducer;
