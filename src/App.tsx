import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import './App.css'; // Keep or remove default App.css as needed

// Placeholder for DashboardPage
const DashboardPage: React.FC = () => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <p>Welcome to the SIAP application dashboard!</p>
      {/* TODO: Add logout button and other dashboard content */}
    </div>
  );
};

// Placeholder for a ProtectedRoute component (to be implemented later)
// For now, Dashboard is directly accessible for routing setup.
// We will add actual protection based on auth state later.

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate replace to="/login" />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/dashboard" element={<DashboardPage />} /> {/* Placeholder */}
      {/* TODO: Add other routes like /add, /archive, /admin */}
      {/* TODO: Implement ProtectedRoute for routes requiring authentication */}
    </Routes>
  );
}

export default App;
