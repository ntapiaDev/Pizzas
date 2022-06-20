import React from 'react'
import { Container } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';

const Paypal = () => {
    const location = useLocation();

    return (
        <Container>
            <h1>Time to pay</h1>
            <p>{location.state.totalPrice}€ for {location.state.totalOrders} pizzas.</p>
        </Container>
    )
}

export default Paypal