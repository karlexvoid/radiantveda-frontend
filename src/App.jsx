import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import LoginSignupPage from "./pages/LoginSignupPage"; // Adjust path if necessary
import Questionnaire from "./components/Questionnaire"; // Adjust path if necessary
import PrivateRoute from './components/PrivateRoute'; // Import the PrivateRoute component
import Routine from "./pages/Routine";  // Import the Routine page
import About from "./pages/About";  // Import the About page

function App() {
    return (
        <Router>
            <Header />
            <div>
                <Routes>
                    <Route path="/" element={<h2>Welcome to RadiantVedaAI</h2>} />
                    <Route path="/auth" element={<LoginSignupPage />} />
                    <Route
                        path="/questionnaire"
                        element={
                            <PrivateRoute>
                                <Questionnaire />
                            </PrivateRoute>
                        }
                    />
                    <Route path="/routine" element={<Routine />} />
                    <Route path="/about" element={<About />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;



