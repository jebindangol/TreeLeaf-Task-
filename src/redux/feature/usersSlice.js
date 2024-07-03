import { createSlice } from '@reduxjs/toolkit';

const usersSlice = createSlice({
  name: 'users',
  initialState: [],
  reducers: {
    addUser: (state, action) => {
      state.push(action.payload);
    },
    deleteUser: (state, action) => {
      return state.filter((_, index) => index !== action.payload);
    },
    updateUser: (state, action) => {
      const { index, user } = action.payload;
      state[index] = user;
    },
  },
});

export const { addUser, deleteUser, updateUser } = usersSlice.actions;

export default usersSlice.reducer;
