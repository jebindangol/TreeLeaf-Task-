import { configureStore } from '@reduxjs/toolkit';
import usersReducer from './feature/usersSlice';
import countriesReducer from './feature/countriesSlice';

export const store = configureStore({
  reducer: {
    users: usersReducer,
    countries: countriesReducer,
  },
});
