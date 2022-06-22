import React, { useRef, useState } from "react";
import { useEffect } from "react";
import { Container } from 'react-bootstrap';
import { useCookies } from "react-cookie";
import { useLocation, useNavigate } from 'react-router-dom';
import useLocalStorage from '../hooks/useLocalStorage';
import axios from 'axios';
import ReCAPTCHA from "react-google-recaptcha";

const Paypal = (props) => {
    const location = useLocation();
    const navigate = useNavigate();
    const [storage, setStorage] = useLocalStorage("cart", []);
    const [cookies, setCookie] = useCookies([]);

    const [checkout, setCheckout] = useState(false);
    const [success, setSuccess] = useState(false);

    const paypal = useRef();

    useEffect(() => {
        if(location.state == undefined || location.state?.totalPrice <= 0) {
            navigate("/", { replace: true });
        }

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

                    //Enregistrement de la commande côté serveur
                    try {
                        const response = await axios.post('http://localhost:8080/pizza/order',
                            {
                                order: location.state.pizzas,
                                price: location.state.totalPrice,
                                userToken: cookies.token
                            },
                            {
                                headers: {
                                    'Content-Type': 'application/json'
                                }
                            });
                        console.log(response);

                    } catch (err) {
                        console.log(err.response);
                    }

                    setCheckout(false);
                    setSuccess(true);
                    setStorage([]);
                    props.setCartLength(0);
                },
                onError: (err) => { console.log(err); }
            }).render(paypal.current)
        }
    }, [checkout]);

    const handleCaptcha = (e) => {
        console.log("Captcha value:", e.current.value);
    }

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
                    <ReCAPTCHA
                        sitekey="6LfGWI4gAAAAAOd82s2KZn1t06gRAio1rrrNzS8N"
                        onChange={(e) => handleCaptcha(e)}
                    />
                    <button onClick={() => setCheckout(true)} className="mt-5">
                        Checkout
                    </button>
                </>}
            </>}

        </Container>
    )
}

export default Paypal