import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage'; // Import DashboardPage
import ProtectedRoute from './components/ProtectedRoute';
import './App.css'; // Keep or remove default App.css as needed

// Main App component with routing
function App() {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<Navigate replace to="/login" />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      {/* Protected routes */}
      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<DashboardPage />} />
        {/* TODO: Add other protected routes like /add, /archive, /admin */}
      </Route>

      {/* TODO: Add a 404 Not Found route */}
    </Routes>
  );
}

export default App;
