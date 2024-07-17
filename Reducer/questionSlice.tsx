import { API_BASE_URL, QUESTION_API_URL } from '../api.config';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

import { getToken } from '../localStorageUtil';

interface QuestionState {
  list: any[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: QuestionState = {
  list: [],
  status: 'idle',
  error: null,
};

export const fetchQuestionList = createAsyncThunk(
  'Category/fetchCategoryList',
  async (_, { getState }) => {
    const state: any = getState();
    const token = getToken();
    if (!token) {
      console.error('No token found in local storage');
      return;
    }
    const response = await axios.get(`${API_BASE_URL}${QUESTION_API_URL}`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    return response.data.data;
  }
);

const QuestionSlice = createSlice({
  name: 'question',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchQuestionList.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchQuestionList.fulfilled, (state, action: PayloadAction<any[]>) => {
        state.status = 'succeeded';
        state.list = action.payload;
      })
      .addCase(fetchQuestionList.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Something went wrong';
      });
  },
});

export default QuestionSlice.reducer;
