// src/features/AuthSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { baseUrl } from '../../utils/url';
import { showSuccessToast, showErrorToast,showInfoToast } from '../../utils/toastMessages';
// Define the async thunk
export const placeBet = createAsyncThunk(
  'PLACE_BET',
  async (betData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${baseUrl}/api/v1/users/bet/${localStorage.getItem('user')}`, betData, {
        headers: {
          'Authorization' : `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
      });
      showInfoToast(response.data.data.message);
      return response.data; // The payload to be passed to fulfilled
    } catch (error) {
      console.log(error)
      showErrorToast(error.response.data.error);
      return rejectWithValue(error.response.data); // The payload to be passed to rejected
    }
  }
);


const BetSlice = createSlice({
  name: 'BetSlice',
  initialState: {
    data: {},
    error: null,
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(placeBet.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(placeBet.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data;
       
      })
      .addCase(placeBet.rejected, (state, action) => {
        console.log(action)
        state.loading = false;
        // state.error = action.payload.data.message;
      
      })
    
  },
});

export default BetSlice.reducer;
