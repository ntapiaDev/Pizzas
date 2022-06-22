import React, { useEffect, useState } from 'react'
import { Container, Row, Col } from "react-bootstrap";
import Pizza from '../components/Pizza';
import axios from 'axios';
import useLocalStorage from '../hooks/useLocalStorage';
import useAuth from "../hooks/useAuth";

const HomeScreen = (props) => {
    const [pizzas, setPizzas] = useState([]);
    const [storage, setStorage] = useLocalStorage("cart", []);

    const auth = useAuth();
    console.log(auth);

    useEffect(() => {
        const getPizzas = async () => {
            try {
                const response = await axios.get('http://localhost:8080/pizza', {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                setPizzas(response.data);
            } catch(err) {
                console.error(err);
            }
        }
        getPizzas();
    }, []);

    return (
        <>
            <Container>
                <Row>
                    {
                        pizzas.map((pizza, i) => (
                            <Col key={i} className='col-md-4 d-flex justify-content-center'>
                                <Pizza lapizza={pizza} setCartLength={props.setCartLength} storage={storage} setStorage={setStorage} />
                            </Col>
                        ))
                    }
                </Row>
            </Container>
        </>
    )
}

export default HomeScreen