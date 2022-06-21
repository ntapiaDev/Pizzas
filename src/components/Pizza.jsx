import React, {useState} from 'react'
import { Card, Button, Row, Col, Modal, Container } from 'react-bootstrap';

const Pizza = (props) => {
    const[taille, setTaille] = useState('small');
    const[quantite, setQuantite] = useState(1);
    const[show, setShow] = useState(false);
    const[added, setAdded] = useState(false);
    const[addedClass, setAddedClass] = useState('notif');

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const addPizza = () => {
        let cart = [];
        if(props.storage !== '') {
            cart = props.storage;
        }

        let added = false;
        cart.forEach(pizza => {
            if(pizza.name === props.lapizza.name && pizza.varient === taille) {
                pizza.quantity = parseInt(pizza.quantity) + parseInt(quantite);
                added = true;
                return;
            }
        });

        if(!added) {
            let pizza = {'name' : props.lapizza.name, 'varient' : taille, 'quantity' : quantite, 'image' : props.lapizza.image, 'price' : props.lapizza.prices[0][taille], 'description' : props.lapizza.description, 'id' : props.lapizza._id};
            cart.push(pizza);
        }

        props.setStorage(cart);
        props.setCartLength(props.storage.length);

        //ANIME
        setAddedClass('notif animated');
        setTimeout(() => setAddedClass('notif'), 2000);
    }

  return (
    <>
        <Card style={{ width: '18rem', marginTop: '50px' }} className="notif-container">
            <Card.Img variant="top" src={props.lapizza.image} />
            <Card.Body>
                <Card.Title>{props.lapizza.name}</Card.Title>
                <Card.Body>
                    <Row>
                        <Col md={6}>
                            <h6>Taille :
                                <select 
                                    value={taille}
                                    onChange={(e) => setTaille(e.target.value)}
                                >
                                    {props.lapizza.varients.map((varient, i) => (
                                        <option key={i} value={varient}>{varient}</option>
                                    ))}
                                </select>
                            </h6>
                        </Col>
                        <Col md={6}>
                            <h6>Quantité :<br/>
                            <select
                                value={quantite}
                                onChange={(e) => setQuantite(e.target.value)}
                            >
                                {[...Array(10).keys()].map((v,i) => (
                                    <option key={i} value={i+1}>{i+1}</option>
                                ))}
                            </select>
                            </h6>
                        </Col>
                    </Row>
                </Card.Body>
                <Row>
                    <Col md={5}>
                        Prix : {props.lapizza.prices[0][taille] * quantite} €
                    </Col>
                    <Col md={7}>
                        <Button className='bg-warning text-light' onClick={addPizza}>Add</Button>
                        <Button className='bg-success text-light ms-3' onClick={handleShow}>Show</Button>
                    </Col>
                </Row>
            </Card.Body>
            <Container className={addedClass}>Pizza added to your cart !</Container>
        </Card>

        {/* Modale */}
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{props.lapizza.name}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <img src={props.lapizza.image} alt={props.lapizza.name} className="img-fluid"/>
                <h6 className='mt-3'>Description</h6>
                <p>{props.lapizza.description}</p>
            </Modal.Body>
        </Modal>
    </>
  );
};

export default Pizza;