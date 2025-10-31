import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import CutiForm from "./pages/CutiForm";
import ProtectedRoute from "./components/ProtectedRoute";
import CutiDetail from "./pages/CutiDetail";
import CutiEdit from "./pages/CutiEdit";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" replace />} />

      <Route path="/login" element={<Login />} />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/cuti/add"
        element={
          <ProtectedRoute>
            <CutiForm />
          </ProtectedRoute>
        }
      />

      <Route
        path="/cuti/:id"
        element={
          <ProtectedRoute>
            <CutiDetail />
          </ProtectedRoute>
        }
      />

      <Route
        path="/cuti/edit/:id"
        element={
          <ProtectedRoute>
            <CutiEdit />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}
