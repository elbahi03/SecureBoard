import api from './api';
import axios from 'axios';

const authService = {
  async login(credentials) {
    // Perform web login with Sanctum cookies, then fetch the authenticated user
    await axios.get('http://localhost:8000/sanctum/csrf-cookie', { withCredentials: true });
    await axios.post('http://localhost:8000/login', credentials, {
      withCredentials: true,
      headers: { 'X-Requested-With': 'XMLHttpRequest' }
    });
    const me = await api.get('/user');
    return me.data;
  },

  async register(userData) {
    const response = await api.post('/register', userData);
    return response.data;
  },

  async logout() {
    await axios.post('http://localhost:8000/logout', {}, {
      withCredentials: true,
      headers: { 'X-Requested-With': 'XMLHttpRequest' }
    });
    return { success: true };
  },

  async forgotPassword(email) {
    const response = await api.post('/forgot-password', { email });
    return response.data;
  },

  async resetPassword(data) {
    const response = await api.post('/reset-password', data);
    return response.data;
  },

  async getUser() {
    const response = await api.get('/user');
    return response.data;
  },

  async updateProfile(data) {
    const response = await api.put('/user/profile-information', data);
    return response.data;
  },

  async updatePassword(data) {
    const response = await api.put('/user/password', data);
    return response.data;
  }
};

export default authService;