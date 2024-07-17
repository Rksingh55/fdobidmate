import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_BASE_URL, VENDORTYPE_API_URL } from '../api.config';
import { getToken } from '../localStorageUtil';


interface VendorType {
  list: any[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: VendorType = {
  list: [],
  status: 'idle',
  error: null,
};

export const fetchVendorTpeList = createAsyncThunk('currency/fetchVendorTpeList',
  async (_, { getState }) => {
    const state: any = getState();
    const token = getToken();
    const response = await axios.get(`${API_BASE_URL}${VENDORTYPE_API_URL}`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });
    return response?.data?.data;
  }
);

const vendorTpeSlice = createSlice({
  name: 'vendortype',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchVendorTpeList.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchVendorTpeList.fulfilled, (state, action: PayloadAction<any[]>) => {
        state.status = 'succeeded';
        state.list = action.payload;
      })
      .addCase(fetchVendorTpeList.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Something went wrong';
      });
  },
});

export default vendorTpeSlice.reducer;
