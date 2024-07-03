import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchCountries = createAsyncThunk('countries/fetchCountries', async () => {
  const response = await fetch('https://restcountries.com/v3.1/all');
  const data = await response.json();
  return data;
});

const countriesSlice = createSlice({
  name: 'countries',
  initialState: [],
  extraReducers: (builder) => {
    builder.addCase(fetchCountries.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

export default countriesSlice.reducer;
