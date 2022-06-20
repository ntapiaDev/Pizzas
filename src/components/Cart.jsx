import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { Container, Table } from 'react-bootstrap';
import { FiDelete } from 'react-icons/fi';
import axios from 'axios';

const Cart = (props) => {
    const [cart, setCart] = useState();
    const [total, setTotal] = useState(0);
    const [update, setUpdate] = useState(0);

    useEffect(() => {
        let storage = [];
        for (let i = 0; i < localStorage.length; i++) {
            storage.push(localStorage[Object.keys(localStorage)[i]])
        }
        setCart(storage);

        let getTotal = 0;
        if(storage.length === 0) {
            setTotal(getTotal);
            return;
        }
        storage.forEach(order => {

            const getPizza = async () => {
                try {
                    const response = await axios.get('http://localhost:8080/pizza/' + JSON.parse(order).id, {
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    });
                    getTotal += response.data.prices[0][JSON.parse(order).varient] * JSON.parse(order).quantity;
                    setTotal(getTotal);
                } catch (err) {
                    console.error(err);
                }
            }
            getPizza();
        })
    }, [update]);

    const removePizza = (i) => {
        localStorage.removeItem(i);
        props.setCartLength(localStorage.length);
        setUpdate(update + 1);
    }

    return (

        <Container>
            <h1 className='text-center mt-5'>My Cart</h1>

            <Table className='text-center' striped bordered hover>
                <thead>
                    <tr className='bg-warning'>
                        <th>Image</th>
                        <th>Name</th>
                        <th>Varient</th>
                        <th>Quantity</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {cart?.map((pizza) =>
                        <tr>
                            <td><img src={JSON.parse(pizza).image} alt={JSON.parse(pizza).name} className="w-25" /></td>
                            <td>{JSON.parse(pizza).name}</td>
                            <td>{JSON.parse(pizza).varient}</td>
                            <td>{JSON.parse(pizza).quantity}</td>
                            <td><FiDelete className="text-danger pointer" onClick={() => removePizza(JSON.parse(pizza).value)} /></td>
                        </tr>
                    )}
                    <tr>
                        <td colSpan={3}></td>
                        <td>Total :</td>
                        <td>{total}€</td>
                    </tr>
                </tbody>
            </Table>

        </Container>
    )
}

export default Cart