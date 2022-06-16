import React from 'react'
import { Navbar, Nav, Container, Image } from "react-bootstrap";
import { LinkContainer } from 'react-router-bootstrap';

const NavBar = () => {
  return (
    <>
        <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
            <Container>
                <Navbar.Brand>
                    <Image src="images\White_pizza-logo_250x250.jpg" alt="Logo Pizza Delicious" style={{width: '20%'}} />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="ms-auto">
                        <LinkContainer to="/login">
                            <Nav.Link>Login</Nav.Link>
                        </LinkContainer>
                        <LinkContainer to="/panier">
                            <Nav.Link>Panier</Nav.Link>
                        </LinkContainer>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    </>
  )
}

export default NavBar