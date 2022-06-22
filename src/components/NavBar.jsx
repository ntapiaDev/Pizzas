import React from 'react'
import { Navbar, Nav, Container, Image } from "react-bootstrap";
import { LinkContainer } from 'react-router-bootstrap';
import { useNavigate } from 'react-router-dom';
import useAuth from "../hooks/useAuth";
import { useCookies } from "react-cookie";

const NavBar = (props) => {
    const { auth, setAuth } = useAuth();
    const [cookies, setCookie, removeCookie] = useCookies(["token"]);
    const navigate = useNavigate();

    const handleLogout = () => {
        setAuth('');
        removeCookie("email");
        removeCookie("token");
        console.log('logout');
        navigate("/", { replace: true });
    }

    return (
        <>
            <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
                <Container>
                    <Navbar.Brand>
                        <LinkContainer to="/">
                            <Nav.Link><Image src="images\White_pizza-logo.jpg" alt="Logo Pizza Delicious" style={{ width: '20%' }} /></Nav.Link>
                        </LinkContainer>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="ms-auto">
                            {!cookies.email ?
                                <>
                                    <LinkContainer to="/login">
                                        <Nav.Link>Login</Nav.Link>
                                    </LinkContainer>
                                    <LinkContainer to="/register">
                                        <Nav.Link>Register</Nav.Link>
                                    </LinkContainer>
                                </> : <>
                                    <span className='nav-link'>Welcome {cookies.email}</span>
                                    <span className='nav-link pointer' onClick={handleLogout}>Logout</span>
                                </>
                            }
                            <LinkContainer to="/cart">
                                <Nav.Link>Cart ({props.cartLength}){!cookies.email ? <><br/><span className='needLogin alert alert-danger'>You need an account to validate your order</span></> : <></>}</Nav.Link>
                            </LinkContainer>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    )
}

export default NavBar