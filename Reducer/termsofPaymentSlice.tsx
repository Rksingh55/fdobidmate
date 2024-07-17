import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_BASE_URL, TERMSOFPAYMENT_API_URL } from '../api.config';
import { getToken } from '../localStorageUtil';


interface TermsofPayment {
  list: any[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: TermsofPayment = {
  list: [],
  status: 'idle',
  error: null,
};

export const fetchTermsofPaymentList = createAsyncThunk('currency/fetchTermsofPaymentList',
  async (_, { getState }) => {
    const state: any = getState();
    const token = getToken();
    const response = await axios.get(`${API_BASE_URL}${TERMSOFPAYMENT_API_URL}`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });
    return response?.data?.data;
  }
);

const TermsofPaymentSlice = createSlice({
  name: 'termsofpayment',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTermsofPaymentList.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchTermsofPaymentList.fulfilled, (state, action: PayloadAction<any[]>) => {
        state.status = 'succeeded';
        state.list = action.payload;
      })
      .addCase(fetchTermsofPaymentList.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Something went wrong';
      });
  },
});

export default TermsofPaymentSlice.reducer;
