import { API_BASE_URL, VENDOR_ALL_INFORMATION_API_URL } from '../../api.config';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { getToken } from '../../localStorageUtil';

interface VendordataState {
    list: any[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

const initialState: VendordataState = {
    list: [],
    status: 'idle',
    error: null,
};

export const fetchvendordata = createAsyncThunk(
    'vendordata/fetchvendordata',
    async (_, { getState }) => {
        const state: any = getState();
        const token = getToken();
        const response = await axios.get(`${API_BASE_URL}${VENDOR_ALL_INFORMATION_API_URL}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });

        return response.data.data;
    }
);

const VendordataSlice = createSlice({
    name: 'vendordata',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchvendordata.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchvendordata.fulfilled, (state, action: PayloadAction<any[]>) => {
                state.status = 'succeeded';
                state.list = action.payload;
            })
            .addCase(fetchvendordata.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Something went wrong';
            });
    },
});

export default VendordataSlice.reducer;
