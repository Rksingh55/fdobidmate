import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_BASE_URL, MODE_OFDELIVERY_API_URL, TERMSOFDELIVERY_API_URL } from '../api.config';
import { getToken } from '../localStorageUtil';


interface ModeofDelivery {
    list: any[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

const initialState: ModeofDelivery = {
    list: [],
    status: 'idle',
    error: null,
};

export const fetchModeofDeliveryList = createAsyncThunk('Modeofdelivery/fetchModeofDeliveryList',
    async (_, { getState }) => {
        const state: any = getState();
        const token = getToken();
        const response = await axios.get(`${API_BASE_URL}${MODE_OFDELIVERY_API_URL}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });
        return response?.data?.data;
    }
);

const TermsofDeliverySlice = createSlice({
    name: 'Modeofdelivery',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchModeofDeliveryList.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchModeofDeliveryList.fulfilled, (state, action: PayloadAction<any[]>) => {
                state.status = 'succeeded';
                state.list = action.payload;
            })
            .addCase(fetchModeofDeliveryList.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Something went wrong';
            });
    },
});

export default TermsofDeliverySlice.reducer;
