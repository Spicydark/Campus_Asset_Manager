import axios from 'axios';

const API_BASE_URL = '/api';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Authentication APIs
export const authAPI = {
  register: (userData) => api.post('/auth/register', userData),
  login: (credentials) => api.post('/auth/login', credentials),
};

// Asset APIs
export const assetAPI = {
  getAll: () => api.get('/assets'),
  getById: (id) => api.get(`/assets/${id}`),
  getByStatus: (status) => api.get(`/assets/status/${status}`),
  create: (assetData) => api.post('/assets', assetData),
  update: (id, assetData) => api.put(`/assets/${id}`, assetData),
  delete: (id) => api.delete(`/assets/${id}`),
};

// Request APIs
export const requestAPI = {
  getAll: () => api.get('/requests'),
  getById: (id) => api.get(`/requests/${id}`),
  getByStatus: (status) => api.get(`/requests/status/${status}`),
  getByUserId: (userId) => api.get(`/requests/user/${userId}`),
  create: (requestData) => api.post('/requests', requestData),
  updateStatus: (id, statusData) => api.patch(`/requests/${id}/status`, statusData),
  delete: (id) => api.delete(`/requests/${id}`),
};

// User APIs
export const userAPI = {
  getAll: () => api.get('/users'),
  getById: (id) => api.get(`/users/${id}`),
  getByUsername: (username) => api.get(`/users/username/${username}`),
  delete: (id) => api.delete(`/users/${id}`),
};

export default api;
