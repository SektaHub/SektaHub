import axios from 'axios';
import api from './axiosConfig';

// Define a more specific error response interface
interface ErrorResponse {
  message?: string;
  error?: string;
  details?: string;
}

interface LoginResponse {
  tokenType: string;
  accessToken: string;
  expiresIn: number;
  refreshToken: string;
}

export const AuthService = {
  async login(email: string, password: string): Promise<LoginResponse> {
    try {
      const response = await api.post<LoginResponse>('identity/login', { 
        email, 
        password 
      });
      
      // Save tokens and related information
      localStorage.setItem('accessToken', response.data.accessToken);
      localStorage.setItem('refreshToken', response.data.refreshToken);
      localStorage.setItem('tokenType', response.data.tokenType);
      localStorage.setItem('tokenExpires', (Date.now() + response.data.expiresIn * 1000).toString());

      return response.data;
    } catch (error) {
      // Explicitly type the error
      if (axios.isAxiosError<ErrorResponse>(error)) {
        // Safe access to error message
        const errorMessage = error.response?.data?.message 
          || error.response?.data?.error 
          || error.message 
          || 'Login failed';

        console.error('Login error details:', {
          response: error.response?.data,
          status: error.response?.status,
          message: errorMessage
        });

        // Throw a new error with a safe message
        throw new Error(errorMessage);
      }

      // Fallback for non-axios errors
      throw new Error('Login failed. Please try again.');
    }
  },

  logout(): void {
    // Clear all token-related local storage
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('tokenType');
    localStorage.removeItem('tokenExpires');
  },

  getAccessToken(): string | null {
    return localStorage.getItem('accessToken');
  },

  getRefreshToken(): string | null {
    return localStorage.getItem('refreshToken');
  },

  isTokenExpired(): boolean {
    const expiresAt = localStorage.getItem('tokenExpires');
    return !expiresAt || Date.now() >= parseInt(expiresAt);
  },

  isAuthenticated(): boolean {
    return !!this.getAccessToken() && !this.isTokenExpired();
  }
};