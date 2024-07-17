import { createSlice } from '@reduxjs/toolkit';

const tasksSlice = createSlice({
  name: 'tasks',
  initialState: {
    tasks: [],
  },
  reducers: {
    addTodo: (state, action) => {
      state.tasks.push({
        id: new Date().getTime(),
        text: action.payload,
      });
    },
    deleteTodo: (state, action) => {
      state.tasks = state.tasks.filter(task => task.id !== action.payload);
    },
  },
});

export const { addTodo, deleteTodo } = tasksSlice.actions;
export default tasksSlice.reducer;
