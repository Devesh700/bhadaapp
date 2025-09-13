import { createAsyncThunk } from '@reduxjs/toolkit';
import authService, { RegisterData, LoginData } from '../services/auth.services';
import apiService from '../../services/api';
import { AxiosError } from 'axios';
import api from '../../services/api';

// Helper function to handle API errors
const handleApiError = (error: unknown): string => {
  if (error instanceof AxiosError) {
    return error.response?.data?.message || error.message || 'An error occurred';
  }
  return error instanceof Error ? error.message : 'An unknown error occurred';
};

export const registerUser = createAsyncThunk(
  'auth/register',
  async (userData: RegisterData, { rejectWithValue }) => {
    try {
      const response = await authService.register(userData);
      
      if (!response.success) {
        return rejectWithValue(response.message || 'Registration failed');
      }

      // Store token if provided
      if (response.token) {
        apiService.setAuthToken(response.token);
      }

      return response;
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  }
);

export const loginUser = createAsyncThunk(
  'auth/login',
  async (credentials: LoginData, { rejectWithValue }) => {
    try {
      const response = await authService.login(credentials);

      if (!response.token) {
        return rejectWithValue(response.message || 'Login failed');
      }

      // Store token
      if (response.token) {
        apiService.setAuthToken(response.token);
      }

      return response;
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  }
);


export const getMe = createAsyncThunk(
  'auth/me',
  async (_, { rejectWithValue }) => {
    try {
      const response = await authService.getUser();

      if (!response.token) {
        return rejectWithValue(response.message || 'Unauthorized access');
      }

      // Store token
      if (response.token) {
        apiService.setAuthToken(response.token);
      }

      return response;
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  }
);

export const dailyLogin = createAsyncThunk(
  'auth/dailyLogin',
  async (_, { rejectWithValue, getState }) => {
    try {
      const state = getState() as { auth: { token: string | null } };
      
      if (!state.auth.token) {
        return rejectWithValue('No authentication token found');
      }

      const response = await authService.dailyLogin();

      if (!response.success) {
        return rejectWithValue(response.message || 'Daily login failed');
      }

      return response;
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  }
);

export const refreshToken = createAsyncThunk(
  'auth/refreshToken',
  async (_, { rejectWithValue }) => {
    try {
      const response = await authService.refreshToken();

      if (!response.success) {
        return rejectWithValue(response.message || 'Token refresh failed');
      }

      if (response.token) {
        apiService.setAuthToken(response.token);
      }

      return response;
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  }
);

export const getProfile = createAsyncThunk(
  'auth/getProfile',
  async (_, { rejectWithValue }) => {
    try {
      const response = await authService.getProfile();

      if (!response.success) {
        return rejectWithValue(response.message || 'Failed to get profile');
      }

      return response;
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  }
);




export const sendOTP = createAsyncThunk<any,any>(
  'auth/sendOTP',
  async ({ email, type }, { rejectWithValue }) => {
    try {
      const response = await api.post(`/auth/send-otp?type=${type}`, { email });
      return response;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to send OTP');
    }
  }
);

export const verifyOTPAndAuth = createAsyncThunk(
  'auth/verifyOTPAndAuth',
  async ({ email, otp, userType, type }: { 
    email: string; 
    otp: string; 
    userType?: 'user' | 'owner' | 'admin' ,
    type?:string
  }) => {
    const response:any = await api.post(`/auth/verify-otp?type=${type}`, { email, otp, userType });
    
    // Store token
    if (response.data.data.token) {
      localStorage.setItem('token', response.data.data.token);
    }
    
    return response.data.data;
  }
);

export const resendOTP = createAsyncThunk<any,any>(
  'auth/resendOTP',
  async ({ email }: { email: string }) => {
    const response = await api.post('/auth/resend-otp', { email });
    return response.data;
  }
);


export const checkEmailAuth = createAsyncThunk<any,any>(
  'auth/checkEmailAuth',
  async ({ email }: { email: string }) => {
    const response = await api.post('/auth/check-email', { email });
    return response.data;
  }
);

export const setPassword = createAsyncThunk(
  'auth/setPassword',
  async ({ password }: { password: string }) => {
    const response = await api.post('/auth/set-password', { password });
    return response.data;
  }
);

// export const checkEmailAuth = createAsyncThunk(
//   'auth/checkEmailAuth',
//   async ({ email }: { email: string }) => {
//     const response = await api.post('/auth/check-email', { email });
//     return response.data.data;
//   }
// );

// src/store/thunks/auth.thunk.ts (add this to existing thunks)
export const googleAuth = createAsyncThunk(
  'auth/googleAuth',
  async (payload: { credential?: string; code?: string; scope?: string }) => {
    const response:any = await api.post('/auth/google', payload);
    debugger
    
    // Store token if provided
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
    }
    
    return response.data;
  }
);

