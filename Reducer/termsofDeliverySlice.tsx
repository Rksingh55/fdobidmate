import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_BASE_URL, TERMSOFDELIVERY_API_URL } from '../api.config';
import { getToken } from '../localStorageUtil';


interface TermsofDelivery {
  list: any[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: TermsofDelivery = {
  list: [],
  status: 'idle',
  error: null,
};

export const fetchTermsofDeliveryList = createAsyncThunk('termsofdelivery/fetchTermsofDeliveryList',
  async (_, { getState }) => {
    const state: any = getState();
    const token = getToken();
    const response = await axios.get(`${API_BASE_URL}${TERMSOFDELIVERY_API_URL}`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });
    return response?.data?.data;
  }
);

const TermsofDeliverySlice = createSlice({
  name: 'termsofdelivery',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTermsofDeliveryList.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchTermsofDeliveryList.fulfilled, (state, action: PayloadAction<any[]>) => {
        state.status = 'succeeded';
        state.list = action.payload;
      })
      .addCase(fetchTermsofDeliveryList.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Something went wrong';
      });
  },
});

export default TermsofDeliverySlice.reducer;
