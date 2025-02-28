import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginSignupPage from "./pages/LoginSignupPage"; // Adjust path if necessary
import Questionnaire from "./pages/Questionnaire"; // Adjust path if necessary
import Routine from "./pages/Routine";  // Import the Routine page
import Beautytips from "./pages/Beautytips";  // Import the Routine page
import Skinconcern from "./pages/Skinconcern";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthProvider } from "./context/AuthContext";
import { ProtectedRoute, PublicRoute } from './components/ProtectedRoute';
import "bootstrap/dist/css/bootstrap.min.css";
import CustomNavbar from "./components/CustomNavbar";
import HomePage from "./pages/HomePage";
import Footer from "./components/Footer";
function App() {
    return (
        <AuthProvider>
            
            <Router>
                <CustomNavbar/>
                {/* <Header /> */}
                <div className="container mt-5">
                <Routes>
                    {/* Public Routes (Accessible to all) */}
                    <Route path="/" element={<HomePage></HomePage>} />
                    {/* <Route path="/about" element={<About />} /> */}

                    {/* Public Only Routes (Cannot be accessed when logged in) */}
                    <Route path="/auth" element={<PublicRoute><LoginSignupPage /></PublicRoute>} />

                    {/* Private Routes (Restricted to logged-in users) */}
                    <Route path="/questionnaire" element={<ProtectedRoute><Questionnaire /></ProtectedRoute>} />
                    <Route path="/routine" element={<ProtectedRoute><Routine /></ProtectedRoute>} />
                    <Route path="/beautytips" element={<ProtectedRoute><Beautytips /></ProtectedRoute>} />
                    <Route path="/skinconcern" element={<ProtectedRoute><Skinconcern /></ProtectedRoute>} />
                </Routes>
                </div>
                <Footer />
                <ToastContainer />
            </Router>
        </AuthProvider>
    );
}

export default App;



