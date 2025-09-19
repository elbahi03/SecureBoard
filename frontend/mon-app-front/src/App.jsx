import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import PrivateRoute from './components/auth/PrivateRoute';
import DashboardLayout from './components/dashboard/DashboardLayout';
import DashboardHome from './components/dashboard/DashboardHome';
import Projects from './components/projects/ProjectsList';
import Users from './components/users/UsersList';
import Profile from './components/dashboard/Profile';
import Unauthorized from './components/errors/Unauthorized';
import NotFound from './components/errors/NotFound';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
         {/* Routes protégées avec layout du dashboard */}
         <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <DashboardLayout />
              </PrivateRoute>
            }
          >
            <Route index element={<DashboardHome />} />
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

          
          {/* Toute autre route redirige vers 404 */}
          <Route path="*" element={<Navigate to="/404" replace />} />
        </Routes>
    </Router>
  );
}

export default App;