import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProtectedRoute from './components/ProtectedRoute'; // Import ProtectedRoute
import './App.css'; // Keep or remove default App.css as needed

// Placeholder for DashboardPage - Will be moved to its own file soon
const DashboardPage: React.FC = () => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <p>Welcome to the SIAP application dashboard!</p>
      {/* TODO: Add logout button and other dashboard content */}
    </div>
  );
};

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
        <Route path="/dashboard" element={<DashboardPage />} /> {/* Placeholder */}
        {/* TODO: Add other protected routes like /add, /archive, /admin */}
      </Route>

      {/* TODO: Add a 404 Not Found route */}
    </Routes>
  );
}

export default App;
