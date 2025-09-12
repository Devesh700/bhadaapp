// src/store/selectors/authSelectors.ts
import { RootState } from '../store';

export const selectAuth = (state: RootState) => state.auth;
export const selectUser = (state: RootState) => state.auth.user;
export const selectToken = (state: RootState) => state.auth.token;
export const selectIsAuthenticated = (state: RootState) => state.auth.isAuthenticated;
export const selectIsLoading = (state: RootState) => state.auth.isLoading;
export const selectAuthError = (state: RootState) => state.auth.error;
export const selectDailyLoginReward = (state: RootState) => state.auth.dailyLoginReward;
export const selectUserRole = (state: RootState) => state.auth.user?.role;
export const selectOtpSent = (state: RootState) => state.auth.otpSend
