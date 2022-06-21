import React, { useRef, useState } from "react";
import { useEffect } from "react";
import { Container } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import useLocalStorage from '../hooks/useLocalStorage';

const Paypal = (props) => {
    const location = useLocation();
    const [storage, setStorage] = useLocalStorage("cart", []);

    const [checkout, setCheckout] = useState(false);
    const [success, setSuccess] = useState(false);

    const paypal = useRef();

    useEffect(() => {
        if (checkout) {
            window.paypal.Buttons({
                createOrder: (data, action, err) => {
                    return action.order.create({
                        intent: "CAPTURE",
                        purchase_units: [
                            {
                                amount: {
                                    value: location.state.totalPrice
                                }
                            }
                        ]
                    })
                },
                onApprove: async (data, actions) => {
                    const order = await actions.order.capture()
                    console.log(order);
                    setCheckout(false);
                    setSuccess(true);
                    setStorage([]);
                    props.setCartLength(0);
                },
                onError: (err) => { console.log(err); }
            }).render(paypal.current)
        }
    }, [checkout]);

    return (
        <Container className="mt-5 d-flex flex-column align-items-center paypal-container">
            {checkout ? <>
                <h1>Time to pay</h1>
                <div>
                    <div ref={paypal}></div>
                </div>
            </> : <>
                {success ? <>
                    <div className="alert alert-success">
                        <h1>Thank you !</h1>
                        <p>Your orders :</p>
                        <ul>
                            {location.state.pizzas.map((pizza, i) => 
                                <li key={i}>{pizza.name} - {pizza.varient} - quantity : {pizza.quantity} - {pizza.price}€</li>
                            )
                        }
                        </ul>
                        <p>Total order : {location.state.totalPrice}€</p>
                        <h3>Enjoy your food !</h3>
                    </div>
                </> : <>
                    <h1>Time to pay</h1>
                    <button onClick={() => setCheckout(true)} className="mt-5">
                        Checkout
                    </button>
                </>}
            </>}

        </Container>
    )
}

export default Paypal