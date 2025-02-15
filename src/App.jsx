import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import LoginSignupPage from "./pages/LoginSignupPage"; // Adjust path if necessary
import Questionnaire from "./components/Questionnaire"; // Adjust path if necessary
// import ProtectedRoute from './components/ProtectedRoute'; // Import the PrivateRoute component
import Routine from "./pages/Routine";  // Import the Routine page
import About from "./pages/About";  // Import the About page
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthProvider } from "./context/AuthContext";
import { ProtectedRoute, PublicRoute } from './components/ProtectedRoute';
import "bootstrap/dist/css/bootstrap.min.css";
import CustomNavbar from "./components/CustomNavbar";

function App() {
    return (
        <AuthProvider>
            
            <Router>
                <CustomNavbar/>
                {/* <Header /> */}
                <div className="container mt-5">
                <Routes>
                    {/* Public Routes (Accessible to all) */}
                    <Route path="/" element={<h2>Welcome to RadiantVedaAI</h2>} />
                    {/* <Route path="/about" element={<About />} /> */}

                    {/* Public Only Routes (Cannot be accessed when logged in) */}
                    <Route path="/auth" element={<PublicRoute><LoginSignupPage /></PublicRoute>} />

                    {/* Private Routes (Restricted to logged-in users) */}
                    <Route path="/questionnaire" element={<ProtectedRoute><Questionnaire /></ProtectedRoute>} />
                    <Route path="/routine" element={<ProtectedRoute><Routine /></ProtectedRoute>} />
                </Routes>
                </div>
                <ToastContainer />
            </Router>
        </AuthProvider>
    );
}

export default App;



