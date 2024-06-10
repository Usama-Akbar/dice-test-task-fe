// src/features/AuthSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { baseUrl } from '../../utils/url';
import { showSuccessToast, showErrorToast } from '../../utils/toastMessages';
// Define the async thunk
export const signUpUser = createAsyncThunk(
  'SIGN_UP',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${baseUrl}/api/v1/users/sign-up`, userData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      showSuccessToast(response.data.message);
      return response.data; // The payload to be passed to fulfilled
    } catch (error) {
      showErrorToast(error.response.data.message);
      return rejectWithValue(error.response.data); // The payload to be passed to rejected
      
    }
  }
);
export const signInUser = createAsyncThunk(
  'SIGN_IN',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${baseUrl}/api/v1/users/login`, userData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      showSuccessToast(response.data.message);
      return response.data; // The payload to be passed to fulfilled
    } catch (error) {
      showErrorToast(error.response.data.message);
      return rejectWithValue(error.response.data); // The payload to be passed to rejected
      
    }
  }
);
export const logoutUser = createAsyncThunk(
  'LOGOUT',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${baseUrl}/api/v1/users/logout`, {
        headers: {
          'Authorization' : `Bearer ${localStorage.getItem('token')}`, 
          'Content-Type': 'application/json',
        },
      });
      showSuccessToast(response.data.message);
      return response.data; // The payload to be passed to fulfilled
    } catch (error) {
      localStorage.clear();
      // showErrorToast(error.response.data.message);
      return rejectWithValue(error.response.data); // The payload to be passed to rejected
      
    }
  }
);
export const loadUser = createAsyncThunk(
  'LOAD_USER',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${baseUrl}/api/v1/users/${localStorage.getItem("user")}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
      });
      return response.data; // The payload to be passed to fulfilled
    } catch (error) {
      return rejectWithValue(error.response.data); // The payload to be passed to rejected
    }
  }
);

const AuthSlice = createSlice({
  name: 'AuthSlice',
  initialState: {
    user: {},
    error: null,
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signUpUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signUpUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.data.user;
       
      })
      .addCase(signUpUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.data.message;
      
      })
      .addCase(signInUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signInUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.data.user;
        localStorage.setItem('token', action.payload.data.accessToken);
        localStorage.setItem('user', action.payload.data.user._id);
       
      }).addCase(loadUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.data.user;
      }) .addCase(loadUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
       
      })
      .addCase(signInUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.data.message;
      
      })

      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logoutUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = {};
        localStorage.clear();
       
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.data.message;
      
      });
  },
});

export default AuthSlice.reducer;
