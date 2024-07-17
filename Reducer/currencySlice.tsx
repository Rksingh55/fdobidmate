import { API_BASE_URL, CURRENCY_API_URL } from '../api.config';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { getToken } from '../localStorageUtil';

interface CurrencyState {
  list: any[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: CurrencyState = {
  list: [],
  status: 'idle',
  error: null,
};

export const fetchCurrencyList = createAsyncThunk(
  'currency/fetchCurrencyList',
  async (_, { getState }) => {
    const state: any = getState();
    const token = getToken();
    const response = await axios.get(`${API_BASE_URL}${CURRENCY_API_URL}`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    return response.data.data;
  }
);

const currencySlice = createSlice({
  name: 'currency',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCurrencyList.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCurrencyList.fulfilled, (state, action: PayloadAction<any[]>) => {
        state.status = 'succeeded';
        state.list = action.payload;
      })
      .addCase(fetchCurrencyList.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Something went wrong';
      });
  },
});

export default currencySlice.reducer;
