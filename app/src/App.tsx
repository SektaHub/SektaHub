import React, { useEffect } from 'react';
import { Routes, Route, BrowserRouter, Navigate, Outlet, useNavigate } from "react-router-dom";
import { AuthService } from './AuthService';
import HomePage from "./pages/HomePage";
import Layout from "./layout/Layout";
import NewsPage from "./pages/NewsPage";
import LoginPage from "./pages/LoginPage";
import "./Boki.scss";

// Protected Route Component
const ProtectedRoute: React.FC = () => {
  return AuthService.isAuthenticated() ? <Outlet /> : <Navigate to="/login" />;
};

// Logout Component
const Logout: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    AuthService.logout();
    navigate('/login');
  }, [navigate]);

  return null; // Optionally show a loading spinner while redirecting
};

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/logout" element={<Logout />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="/news" element={<NewsPage />} />
          </Route>
        </Route>
        {/* Redirect to home or login if no match */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
