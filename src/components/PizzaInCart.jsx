import React, { useState } from 'react'
import { useEffect } from 'react';
import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai'

const PizzaInCart = (props) => {
    const [quantity, setQuantity] = useState(0);

    useEffect(() => {
        setQuantity(props.pizza.quantity)
    })

    //ADD and REMOVE pizzas
    const handlePizza = (action, name, taille) => {
        let newStorage = props.storage;

        newStorage.forEach(pizza => {
            if(pizza.name === name && pizza.varient === taille) {
                pizza.quantity = parseInt(pizza.quantity) + parseInt(action);
                if(pizza.quantity > 0) {
                    setQuantity(pizza.quantity);
                } else {
                    newStorage.splice(props.storage.indexOf(pizza), 1)
                    props.setCartLength(newStorage.length);
                }
            }
        });

        props.setStorage(newStorage);
        props.setCallback(props.callback + 1);
    }
    return (
        <tr key={props.i}>
            <td><img src={props.pizza.image} alt={props.pizza.name} className="w-100" /></td>
            <td>{props.pizza.name}</td>
            <td>{props.pizza.description}</td>
            <td>{props.pizza.varient} ({props.pizza.price}€)</td>
            <td><AiOutlinePlus className="text-success pointer" onClick={() => handlePizza(1, props.pizza.name, props.pizza.varient)} /> {quantity} <AiOutlineMinus className="text-danger pointer" onClick={() => handlePizza(-1, props.pizza.name, props.pizza.varient)} /></td>
            <td>{quantity * props.pizza.price}€</td>
        </tr>
    )
}

export default PizzaInCart