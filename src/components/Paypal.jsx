import React from 'react'
import { Container } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import { usePayPalScriptReducer, PayPalButtons } from "@paypal/react-paypal-js";

const Paypal = () => {
    const location = useLocation();

    const [{ isPending }] = usePayPalScriptReducer();

    return (
        <Container>
            <h1>Time to pay</h1>
            <p>{location.state.totalPrice}€ for {location.state.totalOrders} pizzas.</p>
            {isPending ? <div className="spinner" /> : null}
            {/* <PayPalButtons /> */}
        </Container>
    )
}

export default Paypal