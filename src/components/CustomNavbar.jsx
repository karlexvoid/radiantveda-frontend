import { Navbar, Nav, Button, Container } from "react-bootstrap";
import { Link , useLocation} from "react-router-dom";
import { useAuth } from "../context/AuthContext";
// import "../assets/styles/CustomNavbar.css";
const CustomNavbar = () => {
    const { token, logout } = useAuth();
    
    return (    
        <Navbar expand="lg"style={{ backgroundColor: "rgba(247, 232, 232, 0.08)", zIndex: 1000 }} className="shadow-sm">
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
                        {token && <Nav.Link as={Link} to="/beautytips" className="text-dark fw-medium px-4">Beauty Tips</Nav.Link>}
                        {token && <Nav.Link as={Link} to="/skinconcern" className="text-dark fw-medium px-4">Skin Concern Solutions</Nav.Link>}
                    </Nav>
                                    {/* Right Side - Login/Signup Buttons */}
                <div className="d-flex gap-2">
                    {!token && <Button as={Link} to="/auth" variant="outline-success">Login / SignUp</Button>}
                    {token && <Button as={Link} onClick={logout} variant="outline-danger">Logout</Button>}
                    
                </div>
                </Navbar.Collapse>


            </Container>
        </Navbar>
    );
};

export default CustomNavbar;
