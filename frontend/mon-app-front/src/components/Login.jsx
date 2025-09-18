import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // useNavigate pour redirection
import axios from 'axios';
axios.defaults.withCredentials = true;
axios.defaults.baseURL = 'http://localhost:8000';
axios.defaults.xsrfCookieName = 'XSRF-TOKEN';
axios.defaults.xsrfHeaderName = 'X-XSRF-TOKEN';
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
axios.defaults.headers.common['Accept'] = 'application/json';

// Helper pour lire un cookie par nom
const getCookie = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
  return null;
};

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Init cookie CSRF pour Sanctum
      await axios.get('/sanctum/csrf-cookie');

      // Forcer l'en-tête X-XSRF-TOKEN à partir du cookie si présent
      const xsrfToken = getCookie('XSRF-TOKEN');
      if (xsrfToken) {
        axios.defaults.headers.common['X-XSRF-TOKEN'] = decodeURIComponent(xsrfToken);
      }

      // Appel de la route web /login (pas /api/login)
      const response = await axios.post(
        '/login',
        { email, password },
        { withCredentials: true }
      );

      console.log('Connexion réussie !', response.status);

      // Redirection vers le dashboard après login
      navigate('/dashboard');

    } catch (err) {
      console.error('Erreur de connexion', err?.response || err);
      if (err.response && (err.response.status === 401 || err.response.status === 422)) {
        setError('Email ou mot de passe incorrect.');
      } else if (err.response && err.response.status === 419) {
        setError('Session expirée ou CSRF invalide. Réessayez.');
      } else if (err.response && err.response.status === 404) {
        setError("La route /login n'est pas accessible. Vérifiez le backend.");
      } else {
        setError('Une erreur est survenue. Veuillez réessayer.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div style={{ textAlign: 'right', marginBottom: '10px' }}>
        <Link to="/register" style={{ textDecoration: 'none', color: '#007bff' }}>
          S'inscrire
        </Link>
      </div>

      <h2>Se connecter</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={loading}
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Mot de passe</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={loading}
          />
        </div>

        {error && <p className="error-message" style={{ color: 'red' }}>{error}</p>}

        <button type="submit" className="submit-button" disabled={loading}>
          {loading ? 'Connexion...' : 'Connexion'}
        </button>
      </form>
    </div>
  );
}

export default Login;