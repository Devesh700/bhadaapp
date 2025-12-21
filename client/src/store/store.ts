// src/store/store.ts
import { configureStore } from '@reduxjs/toolkit';
import authSlice from './slices/auth.slice';
import partialSlice from './slices/partials.slice';
import userSlice from './slices/user.slice'
import propertySlice from './slices/property.slice'
export const store = configureStore({
  reducer: {
    auth: authSlice,
    user: userSlice,
    partials: partialSlice,
    property: propertySlice
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
