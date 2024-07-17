import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_BASE_URL, COUNTRY_API_URL, } from '../api.config';
interface CountryState {
  list: any[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: CountryState = {
  list: [],
  status: 'idle',
  error: null,
};

export const fetchCountryList = createAsyncThunk('currency/fetchCountryList',
  async (_, { getState }) => {
    const state: any = getState();
    const Authorization = localStorage.getItem("token");
    const token = Authorization ? Authorization.replace(/['"]/g, '') : "";
    const response = await axios.get(`${API_BASE_URL}${COUNTRY_API_URL}`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });
    return response?.data?.data;
  }
);

const countrySlice = createSlice({
  name: 'country',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCountryList.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCountryList.fulfilled, (state, action: PayloadAction<any[]>) => {
        state.status = 'succeeded';
        state.list = action.payload;
      })
      .addCase(fetchCountryList.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Something went wrong';
      });
  },
});

export default countrySlice.reducer;
