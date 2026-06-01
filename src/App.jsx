import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import AdminDashboard from './pages/AdminDashboard';
import MemberDashboard from './pages/MemberDashboard';
import NotFoundPage from './pages/NotFoundPage';
import ProtectedRoute from './components/layout/ProtectedRoute';

export default function App() {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('user');
    return saved ? JSON.parse(saved) : null;
  });

  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
      <Routes>
        {/* Login Route */}
        <Route
          path="/login"
          element={
            user ? (
              <Navigate to={user.role === 'admin' ? '/admin' : '/member'} replace />
            ) : (
              <LoginPage onLogin={handleLogin} />
            )
          }
        />

        {/* Admin Route */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute user={user} requiredRole="admin">
              <AdminDashboard user={user} onLogout={handleLogout} />
            </ProtectedRoute>
          }
        />

        {/* Member Route */}
        <Route
          path="/member"
          element={
            <ProtectedRoute user={user} requiredRole="member">
              <MemberDashboard user={user} onLogout={handleLogout} />
            </ProtectedRoute>
          }
        />

        {/* Default — redirect to login or dashboard */}
        <Route
          path="/"
          element={
            user ? (
              <Navigate to={user.role === 'admin' ? '/admin' : '/member'} replace />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        {/* Catch all — 404 page */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
  );
}