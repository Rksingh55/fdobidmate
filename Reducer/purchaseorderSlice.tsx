import { API_BASE_URL, PURCHASEORDER_API_URL } from '../api.config';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

import { getToken } from '../localStorageUtil';

interface PurchaseOrderState {
  list: any[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: PurchaseOrderState = {
  list: [],
  status: 'idle',
  error: null,
};

export const fetchPurchaseOrderList = createAsyncThunk(
  'purchaseOrder/fetchPurchaseOrderList',
  async (_, { getState }) => {
    const state: any = getState();
    const token = getToken();
    if (!token) {
      console.error('No token found in local storage');
      return;
    }
    const response = await axios.get(`${API_BASE_URL}${PURCHASEORDER_API_URL}`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    return response.data.data;
  }
);

const purchaseOrderSlice = createSlice({
  name: 'quatation',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPurchaseOrderList.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPurchaseOrderList.fulfilled, (state, action: PayloadAction<any[]>) => {
        state.status = 'succeeded';
        state.list = action.payload;
      })
      .addCase(fetchPurchaseOrderList.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Something went wrong';
      });
  },
});

export default purchaseOrderSlice.reducer;
