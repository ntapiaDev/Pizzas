import React, { useRef, useState } from "react";
import { useEffect } from "react";

import { Container } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';


const Paypal = () => {
    const location = useLocation();

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
                },
                onError: (err) => { console.log(err); }
            }).render(paypal.current)
        }
    }, [checkout]);

    return (
        <Container>
            <h1>Time to pay</h1>
            {checkout ? <>
                <div>
                    <div ref={paypal}></div>
                </div>
            </> : <>
                {success ? <>
                    <div>
                        <div>Bon appétit !</div>
                    </div>
                </> : <>
                    <button onClick={() => setCheckout(true)}>
                        Checkout
                    </button>
                </>}
            </>}

        </Container>
    )
}

export default Paypal