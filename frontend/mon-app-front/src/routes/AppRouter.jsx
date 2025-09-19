import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from '../contexts/AuthContext';
import PrivateRoute from '../components/auth/PrivateRoute';

// Composants d'authentification
import Login from '../components/auth/Login';
import Register from '../components/auth/Register';
import ForgotPassword from '../components/auth/ForgotPassword';

// Layout du dashboard
import DashboardLayout from '../components/dashboard/DashboardLayout';

// Pages du dashboard
import Dashboard from '../pages/Dashboard';
import Projects from '../pages/Projects';
import Users from '../pages/Users';
import Profile from '../pages/Profile';

// Pages d'erreur
import NotFound from '../pages/errors/NotFound';
import Unauthorized from '../pages/errors/Unauthorized';

export default function AppRouter() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/* Routes publiques */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />

          {/* Routes protégées avec layout du dashboard */}
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <DashboardLayout />
              </PrivateRoute>
            }
          >
            <Route index element={<Dashboard />} />
            <Route path="projects" element={<Projects />} />
            <Route
              path="users"
              element={
                <PrivateRoute requiredRole="admin">
                  <Users />
                </PrivateRoute>
              }
            />
            <Route path="profile" element={<Profile />} />
          </Route>

          {/* Pages d'erreur */}
          <Route path="/unauthorized" element={<Unauthorized />} />
          <Route path="/404" element={<NotFound />} />

          {/* Redirection de la racine vers le dashboard */}
          <Route path="/" element={<Navigate to="/dashboard" replace />} />

          {/* Toute autre route redirige vers 404 */}
          <Route path="*" element={<Navigate to="/404" replace />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}