import { createContext, useContext, useState, useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token") || null);

  useEffect(() => {
    // Check if token exists in localStorage when app starts
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  const login = (newToken) => {
    localStorage.setItem("token", newToken);
    setToken(newToken);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    toast.success("You’ve been logged out. See you again soon!",
      {
        position: "top-center", // Corrected position
        autoClose: 1000, // Closes after 3 seconds
        hideProgressBar: true, // Removes progress bar for a smoother feel
        closeOnClick: true, 
        pauseOnHover: true,
        draggable: true
      });
  };

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
