import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_BASE_URL, API_LOCAL_BASE_URL, COUNTRY_API_URL, EMAILVALIDATE_API_URL, } from '../../api.config';
import { getToken } from '@/localStorageUtil';

interface Emailvalidate {
  list: any[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: Emailvalidate = {
  list: [],
  status: 'idle',
  error: null,
};

export const Emailvalidate = createAsyncThunk('emailvalidate/Emailvalidate',
  async (_, { getState }) => {
    const state: any = getState();
    const token = getToken();
    const response = await axios.post(`${API_LOCAL_BASE_URL}${EMAILVALIDATE_API_URL}`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });
    return response?.data?.data;
  }
);

const emailvalidate = createSlice({
  name: 'emailvalidate',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(Emailvalidate.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(Emailvalidate.fulfilled, (state, action: PayloadAction<any[]>) => {
        state.status = 'succeeded';
        state.list = action.payload;
      })
      .addCase(Emailvalidate.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Something went wrong';
      });
  },
});

export default emailvalidate.reducer;
