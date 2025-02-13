import React from "react";
import { Link, useNavigate } from "react-router-dom";  // Import useNavigate for redirection

function Header() {
    const navigate = useNavigate();  // Initialize the navigate function

    const handleLogout = () => {
        // Remove the token from localStorage
        localStorage.removeItem("token");
        // Redirect the user to the login page
        navigate("/auth");
    };

    return (
        <header className="header">
            <h1 className="title">RadiantVedaAI</h1>
            <nav>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/auth">Login/Signup</Link></li>
                    <li><Link to="/questionnaire">Questionnaire</Link></li>
                    <li><Link to="/routine">Routine</Link></li>  {/* Add Routine link */}
                    <li><Link to="/about">About</Link></li>    {/* Add About link */}
                    <li>
                        {/* Add Logout button only if the user is logged in */}
                        {localStorage.getItem("token") && (
                            <button onClick={handleLogout}>Logout</button>
                        )}
                    </li>
                </ul>
            </nav>
        </header>
    );
}

export default Header;



