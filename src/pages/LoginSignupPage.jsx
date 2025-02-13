
// export default LoginSignupPage;
import React, { useState } from "react";
import axios from "axios";
import "./LoginSignupPage.css"; // Optional: Add CSS for styling
// const dotenv = require('dotenv');

const LoginSignupPage = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Define the endpoint and data to send
        console.log("API Base URL:", import.meta.env.VITE_API_BASE_URL);
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

            console.log(isLogin ? "Login successful" : "Signup successful", response.data);

            // Store the token in localStorage (optional)
            if (response.data.token) {
                localStorage.setItem("token", response.data.token);
            }

            // Reset fields and display success message
            setName("");
            setEmail("");
            setPassword("");
            setErrorMessage(""); // Clear any errors
            alert(isLogin ? "Login successful!" : "Signup successful!");
        } catch (error) {
            console.error("Error:", error);
            // Handle errors and display appropriate messages
            setErrorMessage(
                error.response?.data?.message || "An unexpected error occurred."
            );
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
