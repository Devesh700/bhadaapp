import { createAsyncThunk } from '@reduxjs/toolkit';
import authService, { RegisterData, LoginData } from '../services/auth.services';
import apiService from '../../services/api';
import { AxiosError } from 'axios';

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
