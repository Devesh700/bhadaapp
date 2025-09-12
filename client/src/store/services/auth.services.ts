// src/services/authService.ts
import apiService from "@/services/api";

export interface RegisterData {
  email: string;
  password: string;
  phone:String;
  name?: string;
  role: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  token?: string;
}

class AuthService {
  async register(userData: RegisterData): Promise<ApiResponse> {
    const response = await apiService.post<ApiResponse>('/auth/register', userData);
    return response.data;
  }

  async login(credentials: LoginData): Promise<ApiResponse> {
    const response = await apiService.post<ApiResponse>('/auth/login', credentials);
    return response.data;
  }


  async getUser(): Promise<ApiResponse> {
    const response = await apiService.get<ApiResponse>('/auth/me');
    return response.data;
  }

  async dailyLogin(): Promise<ApiResponse> {
    const response = await apiService.post<ApiResponse>('/auth/daily-login');
    return response.data;
  }

  async logout(): Promise<void> {
    // If you have a logout endpoint
    // await apiService.post('/auth/logout');
    apiService.removeAuthToken();
  }

  async refreshToken(): Promise<ApiResponse> {
    const response = await apiService.post<ApiResponse>('/auth/refresh');
    return response.data;
  }

  async getProfile(): Promise<ApiResponse> {
    const response = await apiService.get<ApiResponse>('/auth/profile');
    return response.data;
  }
}

export default new AuthService();
