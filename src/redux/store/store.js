// src/store.js

import { configureStore } from '@reduxjs/toolkit';
import AuthSlice from '../features/AuthSlice';
import BetSlice from '../features/BetSlice';
const store = configureStore({
  reducer: {
    Auth: AuthSlice,
    Bet: BetSlice,
  },
});

export default store;
