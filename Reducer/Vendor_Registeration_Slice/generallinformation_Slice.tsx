import { API_BASE_URL, GENERAL_INFORMATION_FORM_API_URL } from '../../api.config';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { getToken } from '../../localStorageUtil';

interface GeneralInformation {
    list: any[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

const initialState: GeneralInformation = {
    list: [],
    status: 'idle',
    error: null,
};

export const GeneralInformation = createAsyncThunk(
    'vendor/GeneralInformation',
    async (_, { getState }) => {
        const state: any = getState();
        const token = getToken();
        if (!token) {
            console.error('No token found in local storage');
            return;
        }
        const response = await axios.get(`${API_BASE_URL}${GENERAL_INFORMATION_FORM_API_URL}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });

        return response.data.data;
    }
);

const currencySlice = createSlice({
    name: 'currency',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(GeneralInformation.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(GeneralInformation.fulfilled, (state, action: PayloadAction<any[]>) => {
                state.status = 'succeeded';
                state.list = action.payload;
            })
            .addCase(GeneralInformation.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Something went wrong';
            });
    },
});

export default currencySlice.reducer;
