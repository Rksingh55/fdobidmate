import { API_BASE_URL, TENDER_PBGLIST_API_URL } from '../api.config';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { getToken } from '../localStorageUtil';

interface TenderPbgListState {
    list: any[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

const initialState: TenderPbgListState = {
    list: [],
    status: 'idle',
    error: null,
};

export const fetchTenderPbgList = createAsyncThunk(
    'tenderpbgList/fetchTenderPbgList',
    async (_, { getState }) => {
        const state: any = getState();
        const token = getToken();
        const response = await axios.get(`${API_BASE_URL}${TENDER_PBGLIST_API_URL}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });
        return response?.data?.data;
    }
);

const TenderPbgListSlice = createSlice({
    name: 'tenderpbgList',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchTenderPbgList.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchTenderPbgList.fulfilled, (state, action: PayloadAction<any[]>) => {
                state.status = 'succeeded';
                state.list = action.payload;
            })
            .addCase(fetchTenderPbgList.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Something went wrong';
            });
    },
});

export default TenderPbgListSlice.reducer;
