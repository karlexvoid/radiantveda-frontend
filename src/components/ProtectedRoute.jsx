import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export const ProtectedRoute = ({ children }) => {
  const { token } = useAuth();
  return token ? children : <Navigate to="/auth" />;
};

export const PublicRoute = ({ children }) => {
  const { token } = useAuth();
  return token ? <Navigate to="/" /> : children;
};