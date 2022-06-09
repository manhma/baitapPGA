import { configureStore } from '@reduxjs/toolkit';
import authSlice from '../modules/auth/redux/authSlice';

const store = configureStore({
  reducer: {
    auth: authSlice,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
