import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // ✅ Import useAuth

const Header = () => {
    const { token, logout } = useAuth(); // ✅ Get token & logout from context

    return (
        <header className="header">
            <h1 className="title">RadiantVedaAI</h1>
            <nav>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    {!token && <li><Link to="/auth">Login/Signup</Link></li>}
                    {token && <li><Link to="/questionnaire">Questionnaire</Link></li>}
                    {token && <li><Link to="/routine">Routine</Link></li>}
                    {/* <li><Link to="/about">About</Link></li> */}
                    {token && (
                        <li>
                            <button onClick={logout}>Logout</button> {/* ✅ Uses logout from AuthContext */}
                        </li>
                    )}
                </ul>
            </nav>
        </header>
    );
};

export default Header;
