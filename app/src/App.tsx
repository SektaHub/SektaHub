import React from 'react';
import { 
  Routes, 
  Route, 
  BrowserRouter, 
  Navigate, 
  Outlet 
} from "react-router-dom";
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

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
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