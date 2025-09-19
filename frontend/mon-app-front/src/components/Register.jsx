import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const getCookie = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
  return null;
};
function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError("Les mots de passe ne correspondent pas.");
      return;
    }

    setLoading(true);

    try {
      await axios.get('/sanctum/csrf-cookie');

      // Forcer l'en-tête X-XSRF-TOKEN à partir du cookie si présent
      const xsrfToken = getCookie('XSRF-TOKEN');
      if (xsrfToken) {
        axios.defaults.headers.common['X-XSRF-TOKEN'] = decodeURIComponent(xsrfToken);
      }

      console.log("data to send:", { name, email, password });
      const response = await axios.post('http://localhost:8000/api/register', {
        name,
        email,
        password,
      });

      console.log('Inscription réussie !', response);
      localStorage.setItem('authToken', response.data.token);

      // Redirection vers le dashboard après inscription
      navigate('/dashboard');

    } catch (err) {
      console.error('Erreur d\'inscription', err.response);
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError('Une erreur est survenue. Veuillez réessayer.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-container">
      <div style={{ textAlign: 'right', marginBottom: '10px' }}>
        <Link to="/login" style={{ textDecoration: 'none', color: '#007bff' }}>
          Se connecter
        </Link>
      </div>

      <h2>S'inscrire</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Nom</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            disabled={loading}
          />
        </div>

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

        <div className="form-group">
          <label htmlFor="confirmPassword">Confirmer le mot de passe</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            disabled={loading}
          />
        </div>

        {error && <p className="error-message" style={{ color: 'red' }}>{error}</p>}

        <button type="submit" className="submit-button" disabled={loading}>
          {loading ? 'Inscription...' : "S'inscrire"}
        </button>
      </form>
    </div>
  );
}

export default Register;