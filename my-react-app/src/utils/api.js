import axios from 'axios';

const api = axios.create({
  baseURL: 'https://rocky-dusk-48099-109466645bc6.herokuapp.com/', // Replace with your backend base URL
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor to add authorization token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default api;
