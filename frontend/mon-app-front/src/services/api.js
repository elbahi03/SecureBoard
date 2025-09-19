import axios from 'axios';

const API_URL = 'http://localhost:8000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // Important pour les cookies CSRF
});

// Intercepteur pour ajouter le token CSRF
api.interceptors.request.use(async (config) => {
  // Get CSRF cookie from Laravel
  await axios.get('http://localhost:8000/sanctum/csrf-cookie');
  return config;
});

// Intercepteur pour gérer les erreurs
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // Gérer les erreurs d'authentification
      if (error.response.status === 401) {
        // Rediriger vers la page de login
        window.location.href = '/login';
      }
      
      // Gérer les erreurs de validation
      if (error.response.status === 422) {
        return Promise.reject(error.response.data);
      }
    }
    return Promise.reject(error);
  }
);

export default api;