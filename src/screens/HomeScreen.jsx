import React, { useEffect, useState } from 'react'
import AllPizza from '../pizza-data';
import { Container, Row, Col } from "react-bootstrap";
import Pizza from '../components/Pizza';
import axios from 'axios';

const HomeScreen = () => {
    const [pizzas, setPizzas] = useState([]);

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
                        pizzas.map(pizza => (
                            <Col className='col-md-4 d-flex justify-content-center'>
                                <Pizza lapizza={pizza} />
                            </Col>
                        ))
                    }
                </Row>
            </Container>
        </>
    )
}

export default HomeScreen