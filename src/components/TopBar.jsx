import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { MdLocalOffer } from 'react-icons/md';

const TopBar = () => {
  return (
    <>
        <Navbar bg="dark" variant="dark" expand="lg">
            <Container fluid>
                <h6 className='text-light'>
                    <MdLocalOffer className='text-warning' />
                    Livraison gratuite à domicile pour toute commande supérieure à 50€
                </h6>
                <Nav className="ms-auto">
                    <LinkContainer to="/">
                        <Nav.Link>Home</Nav.Link>
                    </LinkContainer>
                    <LinkContainer to="about">
                        <Nav.Link>About us</Nav.Link>
                    </LinkContainer>
                    <LinkContainer to="contact">
                        <Nav.Link>Contact</Nav.Link>
                    </LinkContainer>
                    <LinkContainer to="policy">
                        <Nav.Link>Terms and Policy</Nav.Link>
                    </LinkContainer>
                </Nav>
            </Container>
        </Navbar>
    </>
  );
}

export default TopBar;