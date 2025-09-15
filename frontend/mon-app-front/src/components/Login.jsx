import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // useNavigate pour redirection
import axios from 'axios';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate(); // pour redirection après login

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await axios.post('http://localhost:8000/api/login', {
        email,
        password,
      });

      console.log('Connexion réussie !', response.data);
      localStorage.setItem('authToken', response.data.token);

      // Redirection vers le dashboard après login
      navigate('/dashboard');

    } catch (err) {
      console.error('Erreur de connexion', err.response);
      if (err.response && err.response.status === 401) {
        setError('Email ou mot de passe incorrect.');
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