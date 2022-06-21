import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { Container, Table, Button } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import useLocalStorage from '../hooks/useLocalStorage';
import PizzaInCart from './PizzaInCart';

const Cart = (props) => {
    const navigate = useNavigate();

    const [total, setTotal] = useState(0);
    const [nbPizza, setNbPizza] = useState(0);
    const [storage, setStorage] = useLocalStorage("cart", []);
    const [callback, setCallback] = useState(0);

    useEffect(() => {
        // Total price
        let getTotal = 0;
        let getNbPizza = 0;
        if (storage.length === 0) {
            setTotal(0);
        }
        storage?.forEach(pizza => {
            const getPizza = async () => {
                try {
                    const response = await axios.get('http://localhost:8080/pizza/' + pizza.id, {
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    });
                    getTotal += response.data.prices[0][pizza.varient] * pizza.quantity;
                    setTotal(getTotal);
                    getNbPizza += parseInt(pizza.quantity);
                    setNbPizza(getNbPizza);
                } catch (err) {
                    console.error(err);
                }
            }
            getPizza();
        })
    }, [callback]);

    const pay = () => {

        if (total === 0) {
            return;
        }

        navigate("/paypal", {
            state: {
                totalPrice: total,
                totalOrders: nbPizza,
                pizzas: storage
            }
        });
    }

    return (

        <Container>
            <h1 className='text-center mt-5'>My Cart</h1>
            <Table className='text-center mt-5' striped bordered hover>
                <thead>
                    <tr className='bg-warning'>
                        <th className='w-25'>Image</th>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Varient</th>
                        <th>Quantity</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>
                    {storage?.map((pizza, i) =>
                        <PizzaInCart pizza={pizza} key={i} storage={storage} setStorage={setStorage} callback={callback} setCallback={setCallback} setCartLength={props.setCartLength} />
                    )}
                    <tr>
                        <td colSpan={4}></td>
                        <td>Total :</td>
                        <td>{total}€</td>
                    </tr>
                </tbody>
            </Table>
            <div className='d-flex justify-content-end'>
                <Button className='alert alert-success' disabled={total === 0} onClick={() => pay()}>Continue</Button>
            </div>
        </Container>
    )
}

export default Cart