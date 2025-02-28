import React, { useState } from "react";
import axios from "axios";
// import "../assets/styles/LoginSignupPage.css";
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; 

const LoginSignupPage = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();
    const { login } = useAuth();
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Define the endpoint and data to send
        // console.log("API Base URL:", import.meta.env.VITE_API_BASE_URL);
        const endpoint = isLogin
            ? `${import.meta.env.VITE_API_BASE_URL}/auth/login`
            : `${import.meta.env.VITE_API_BASE_URL}/auth/signup`;

        const data = isLogin
            ? { email, password }
            : { name, email, password };

        try {
            const response = await axios.post(endpoint, data, {
                headers: {
                    "Content-Type": "application/json", // Ensure server recognizes JSON
                },
            });

            // console.log(isLogin ? "Login successful" : "Signup successful", response.data);

            // Store the token in localStorage (optional)
            if (response.data.token) {
                login(response.data.token);
                toast.success(
                    isLogin 
                      ? "Welcome back! You’re now logged in. 😊" 
                      : "Welcome aboard! Your account has been created successfully. 🎉",
                    {
                      position: "top-center", // Corrected position
                      autoClose: 1000, // Closes after 3 seconds
                      hideProgressBar: true, // Removes progress bar for a smoother feel
                      closeOnClick: true, 
                      pauseOnHover: true,
                      draggable: true
                    }
                  );
            }
            

            // Reset fields and display success message
            setName("");
            setEmail("");
            setPassword("");
            setErrorMessage(""); // Clear any errors


        } catch (error) {
            console.error("Error:", error);
            // Handle errors and display appropriate messages
            toast.warning(error.response?.data?.message || "An unexpected error occurred.");
            // setErrorMessage(
                
            // );
        }
    };

    return (
        <div className="login-signup-container">
            <h2>{isLogin ? "Login" : "Sign Up"}</h2>
            <form onSubmit={handleSubmit}>
                {/* Name field for Signup */}
                {!isLogin && (
                    <input
                        type="text"
                        placeholder="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                )}
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">{isLogin ? "Login" : "Sign Up"}</button>
            </form>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            <p>
                {isLogin
                    ? "Don't have an account?"
                    : "Already have an account?"}{" "}
                <button
                    type="button"
                    className="toggle-button"
                    onClick={() => {
                        setIsLogin(!isLogin);
                        setErrorMessage(""); // Clear error messages when toggling
                    }}
                >
                    {isLogin ? "Sign Up" : "Login"}
                </button>
            </p>
        </div>
    );
};

export default LoginSignupPage;
