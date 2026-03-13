import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Home from './pages/Home';
import HospitalSearch from './pages/HospitalSearch';
import PharmacyStore from './pages/PharmacyStore';
import Appointments from './pages/Appointments';
import Login from './pages/Login';
import Register from './pages/Register';
import LabTests from './pages/LabTests';
import Orders from './pages/Orders';
import Profile from './pages/Profile';
import DoctorDashboard from './pages/DoctorDashboard';
import ProtectedRoute from './components/common/ProtectedRoute';
import { useAuth } from './context/AuthContext';

const DashboardRedirect = () => {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  if (user.role === 'doctor') return <Navigate to="/doctor-dashboard" replace />;
  return <Navigate to="/dashboard/appointments" replace />;
};

function App() {
  return (
    <AuthProvider>
      <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/hospitals" element={<HospitalSearch />} />
          <Route path="/pharmacy" element={<PharmacyStore />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Dashboard Routes protected by Auth check */}
          <Route
            path="/dashboard/appointments"
            element={
              <ProtectedRoute>
                <Appointments />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/lab-tests"
            element={
              <ProtectedRoute>
                <LabTests />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/orders"
            element={
              <ProtectedRoute>
                <Orders />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/doctor-dashboard"
            element={
              <ProtectedRoute>
                <DoctorDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardRedirect />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
