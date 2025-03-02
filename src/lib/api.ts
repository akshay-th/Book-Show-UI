// lib/api.ts
import axios from 'axios';
import { useAuthStore } from '@/store/auth-store';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

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

// src/lib/api.ts in your frontend project
// const API_URL = 'http://localhost:3001/api'; // Change to your backend URL

export async function loginUser(email: string, password: string) {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Login failed');
  }

  return response.json();
}

export async function refreshToken(refreshToken: string) {
  const response = await fetch(`${API_URL}/auth/refresh-token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ refreshToken }),
  });

  if (!response.ok) {
    throw new Error('Failed to refresh token');
  }

  return response.json();
}

export async function logoutUser(refreshToken: string) {
  const response = await fetch(`${API_URL}/auth/logout`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ refreshToken }),
  });

  if (!response.ok) {
    throw new Error('Logout failed');
  }

  return response.json();
}

export async function fetchWithAuth(endpoint: string, options: RequestInit = {}) {
  const token = localStorage.getItem('accessToken');
  
  const headers = {
    ...options.headers,
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json',
  };

  try {
    const response = await fetch(`${API_URL}${endpoint}`, {
      ...options,
      headers,
    });

    // If unauthorized, try refreshing token
    if (response.status === 401) {
      const refreshed = await tryRefreshToken();
      
      if (refreshed) {
        // Retry with new token
        const newToken = localStorage.getItem('accessToken');
        const newHeaders = {
          ...options.headers,
          'Authorization': `Bearer ${newToken}`,
          'Content-Type': 'application/json',
        };
        
        return fetch(`${API_URL}${endpoint}`, {
          ...options,
          headers: newHeaders,
        });
      } else {
        // Redirect to login
        window.location.href = '/login';
        throw new Error('Session expired');
      }
    }

    return response;
  } catch (error) {
    console.error('API request error:', error);
    throw error;
  }
}

async function tryRefreshToken() {
  try {
    const storedRefreshToken = localStorage.getItem('refreshToken');
    
    if (!storedRefreshToken) {
      return false;
    }
    
    const data = await refreshToken(storedRefreshToken);
    
    localStorage.setItem('accessToken', data.accessToken);
    localStorage.setItem('refreshToken', data.refreshToken);
    
    return true;
  } catch (error) {
    console.error('Token refresh failed:', error);
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
    return false;
  }
}