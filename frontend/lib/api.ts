import axios from 'axios';
import Cookies from 'js-cookie';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = Cookies.get('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle auth errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      Cookies.remove('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  register: (userData: { name: string; email: string; password: string; bio?: string }) =>
    api.post('/auth/register', userData),
  
  login: (credentials: { email: string; password: string }) =>
    api.post('/auth/login', credentials),
  
  getCurrentUser: () => api.get('/auth/me'),
};

// Users API
export const usersAPI = {
  getProfile: (userId: string) => api.get(`/users/profile/${userId}`),
  
  updateProfile: (profileData: { name?: string; bio?: string }) =>
    api.put('/users/profile', profileData),
  
  searchUsers: (query: string) => api.get(`/users/search?q=${encodeURIComponent(query)}`),
};

// Posts API
export const postsAPI = {
  createPost: (postData: { content: string }) => api.post('/posts', postData),
  
  getFeed: (page: number = 1, limit: number = 10) =>
    api.get(`/posts/feed?page=${page}&limit=${limit}`),
  
  getPost: (postId: string) => api.get(`/posts/${postId}`),
  
  likePost: (postId: string) => api.put(`/posts/${postId}/like`),
  
  addComment: (postId: string, content: string) =>
    api.post(`/posts/${postId}/comment`, { content }),
  
  deletePost: (postId: string) => api.delete(`/posts/${postId}`),
};

export default api;
