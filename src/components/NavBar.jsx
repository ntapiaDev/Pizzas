import React from 'react'
import { Navbar, Nav, Container, Image } from "react-bootstrap";
import { LinkContainer } from 'react-router-bootstrap';
import { useNavigate } from 'react-router-dom';
import useAuth from "../hooks/useAuth";

const NavBar = (props) => {
    const { auth, setAuth } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        setAuth('');
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
                            {!auth.email ?
                                <>
                                    <LinkContainer to="/login">
                                        <Nav.Link>Login</Nav.Link>
                                    </LinkContainer>
                                    <LinkContainer to="/register">
                                        <Nav.Link>Register</Nav.Link>
                                    </LinkContainer>
                                </> : <>
                                    <span className='nav-link'>Welcome {auth.email}</span>
                                    <span className='nav-link pointer' onClick={handleLogout}>Logout</span>
                                </>
                            }
                            <LinkContainer to="/cart">
                                <Nav.Link>Cart ({props.cartLength}){!auth.email ? <><br/><span className='needLogin alert alert-danger'>You need an account to validate your order</span></> : <></>}</Nav.Link>
                            </LinkContainer>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    )
}

export default NavBar