import { API_BASE_URL, INTERESTED_TENDER_LIST_API_URL, QUATATION_API_URL } from '../api.config';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

import { getToken } from '../localStorageUtil';

interface TenderInterestlistState {
    list: any[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

const initialState: TenderInterestlistState = {
    list: [],
    status: 'idle',
    error: null,
};

export const fetchTenderInterestList = createAsyncThunk(
    'Tenderinterest/fetchTenderInterestList',
    async (_, { getState }) => {
        const state: any = getState();
        const token = getToken();
        const response = await axios.get(`${API_BASE_URL}${INTERESTED_TENDER_LIST_API_URL}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });
        return response?.data?.data?.data;
    }
);

const currencySlice = createSlice({
    name: 'Tenderinterest',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchTenderInterestList.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchTenderInterestList.fulfilled, (state, action: PayloadAction<any[]>) => {
                state.status = 'succeeded';
                state.list = action.payload;
            })
            .addCase(fetchTenderInterestList.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Something went wrong';
            });
    },
});

export default currencySlice.reducer;
