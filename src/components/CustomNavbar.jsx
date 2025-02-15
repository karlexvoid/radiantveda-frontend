import { Navbar, Nav, Button, Container } from "react-bootstrap";
import { Link , useLocation} from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const CustomNavbar = () => {
    const { token, logout } = useAuth();
    
    return (
        <Navbar expand="lg" style={{ backgroundColor: "white" }} className="shadow-sm">
            <Container>
                {/* Logo */}
                <Navbar.Brand as={Link} to="/" className=" text-pink">
                    RadiantVedaAI
                </Navbar.Brand>

                {/* Toggle Button for Mobile */}
                <Navbar.Toggle aria-controls="basic-navbar-nav" />

                <Navbar.Collapse id="basic-navbar-nav" className="mx-auto">
                    {/* Center Navigation */}
                    <Nav className="mx-auto d-flex gap-4 px-5"> 
                        {token && <Nav.Link as={Link} to="/" className="text-dark fw-medium px-4">Home</Nav.Link>}
                        {token && <Nav.Link as={Link} to="/questionnaire" className="text-dark fw-medium px-4">Questionnaire</Nav.Link>}
                        {token && <Nav.Link as={Link} to="/routine" className="text-dark fw-medium px-4">Routine</Nav.Link>}
                    </Nav>
                </Navbar.Collapse>

                {/* Right Side - Login/Signup Buttons */}
                <div className="d-flex gap-2">
                    {!token && <Button as={Link} to="/auth" variant="outline-success">Login / SignUp</Button>}
                    {token && <Button as={Link} onClick={logout} variant="outline-danger">Logout</Button>}
                    
                </div>
            </Container>
        </Navbar>
    );
};

export default CustomNavbar;
