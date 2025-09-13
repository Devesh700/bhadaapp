
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User, AuthState } from '../types/auth.type';
import {
  registerUser,
  loginUser,
  dailyLogin,
  refreshToken,
  getProfile,
  getMe,
  sendOTP,
  resendOTP,
  verifyOTPAndAuth,
  googleAuth,
} from '../thunks/auth.thunk';
import apiService from '../../services/api';

// Initial state
const initialState: AuthState = {
  user: null,
  token: localStorage.getItem('token'),
  isLoading: false,
  isAuthenticated: !!localStorage.getItem('token'),
  error: null,
  dailyLoginReward: null,
  otpSend: false,
  otpVerified:false,
};

// Auth slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.error = null;
      state.dailyLoginReward = null;
      apiService.removeAuthToken();
      window.location.href = '/';
    },
    clearError: (state) => {
      state.error = null;
    },
    clearDailyLoginReward: (state) => {
      state.dailyLoginReward = null;
    },
    setCredentials: (state, action: PayloadAction<{ user: User; token: string }>) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
      apiService.setAuthToken(action.payload.token);
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Register user
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.data;
        if (action.payload.token) {
          state.token = action.payload.token;
          state.isAuthenticated = true;
        }
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

    // Login user
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
         
        state.isLoading = false;
        state.user = action.payload.data;
        state.token = action.payload.token || null;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

      // googlelogin

      .addCase(googleAuth.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(googleAuth.fulfilled, (state, action) => {
         
        state.isLoading = false;
        state.user = action.payload.data;
        state.token = action.payload.token || null;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(googleAuth.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })


      .addCase(getMe.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getMe.fulfilled, (state, action) => {
         
        state.isLoading = false;
        state.user = action.payload.data;
        state.token = action.payload.token || null;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(getMe.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

    // Daily login
    builder
      .addCase(dailyLogin.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(dailyLogin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.dailyLoginReward = action.payload.data;
        state.error = null;
      })
      .addCase(dailyLogin.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

    // Refresh token
    builder
      .addCase(refreshToken.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(refreshToken.fulfilled, (state, action) => {
        state.isLoading = false;
        if (action.payload.token) {
          state.token = action.payload.token;
        }
        state.error = null;
      })
      .addCase(refreshToken.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

    // Get profile
    builder
      .addCase(getProfile.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.data;
        state.error = null;
      })
      .addCase(getProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

      // OTP
      .addCase(sendOTP.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(sendOTP.fulfilled, (state, action) => {
         
        state.isLoading = false;
        state.otpSend = true;
        // state.token = action.payload.token || null;
        // state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(sendOTP.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(resendOTP.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(resendOTP.fulfilled, (state, action) => {
         
        state.isLoading = false;
        state.otpSend = true;
        // state.token = action.payload.token || null;
        // state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(resendOTP.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(verifyOTPAndAuth.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(verifyOTPAndAuth.fulfilled, (state, action) => {
         
        state.isLoading = false;
        state.user = action.payload.data;
        state.token = action.payload.token || null;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(verifyOTPAndAuth.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
  },
});

export const { logout, clearError, clearDailyLoginReward, setCredentials, setLoading } = authSlice.actions;
export default authSlice.reducer;
