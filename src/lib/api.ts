// lib/api.ts
import axios from 'axios';
import { useAuthStore } from '@/store/auth-store';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

// Create an axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Add response interceptor to handle common errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle 401 Unauthorized errors
    if (error.response?.status === 401) {
      useAuthStore.getState().logout();
      // Redirect to login if needed
      if (typeof window !== 'undefined') {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

// Type definitions for API responses
interface ApiResponse<T> {
  data: T;
  message?: string;
}

// Auth API
export const authApi = {
  login: async (email: string, password: string) => {
    const response = await api.post<ApiResponse<{ user: any; token: string }>>('/auth/login', {
      email,
      password,
    });
    return response.data;
  },
  
  register: async (userData: any) => {
    const response = await api.post<ApiResponse<{ user: any; token: string }>>('/auth/register', userData);
    return response.data;
  },
};

// Movies API
export const moviesApi = {
  getAll: async (params?: any) => {
    const response = await api.get<ApiResponse<any[]>>('/movies', { params });
    return response.data;
  },
  
  getById: async (id: string) => {
    const response = await api.get<ApiResponse<any>>(`/movies/${id}`);
    return response.data;
  },
};

// Theatres API
export const theatresApi = {
  getAll: async (params?: any) => {
    const response = await api.get<ApiResponse<any[]>>('/theatres', { params });
    return response.data;
  },
  
  getById: async (id: string) => {
    const response = await api.get<ApiResponse<any>>(`/theatres/${id}`);
    return response.data;
  },
  
  getScreens: async (theatreId: string) => {
    const response = await api.get<ApiResponse<any[]>>(`/theatres/${theatreId}/screens`);
    return response.data;
  },
};

// Bookings API
export const bookingsApi = {
  create: async (bookingData: any) => {
    const response = await api.post<ApiResponse<any>>('/bookings', bookingData);
    return response.data;
  },
  
  getById: async (id: string) => {
    const response = await api.get<ApiResponse<any>>(`/bookings/${id}`);
    return response.data;
  },
  
  getUserBookings: async () => {
    const response = await api.get<ApiResponse<any[]>>('/bookings/user');
    return response.data;
  },
};

// Food order API
export const foodApi = {
  getMenu: async (theatreId: string) => {
    const response = await api.get<ApiResponse<any[]>>(`/food/theatres/${theatreId}/menu`);
    return response.data;
  },
  
  createOrder: async (orderData: any) => {
    const response = await api.post<ApiResponse<any>>('/food/orders', orderData);
    return response.data;
  },
  
  updateOrderStatus: async (orderId: string, status: string) => {
    const response = await api.patch<ApiResponse<any>>(`/food/orders/${orderId}/status`, { status });
    return response.data;
  },
};

export default api;