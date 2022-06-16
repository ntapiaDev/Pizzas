import React from 'react';
import { Container, Row, Col, Table } from 'react-bootstrap';
import { FiPhoneCall } from 'react-icons/fi';
import { ImMobile } from 'react-icons/im';
import { AiOutlineMail } from 'react-icons/ai';

const Contact = () => {
  return (
    <>
        <Container style={{marginTop: '50px'}}>
            <Row>
                <Col md={6}>
                    <h1>Pizza Delicious</h1>
                    <h2>Notre adresse :</h2>
                    <p>103, rue des Olives noires</p>
                    <p>75021 Paris</p>
                    <p>POUR VOTRE INFORMATION! Nous offrons un service traiteur complet pour tout événement, grand ou petit. Nous comprenons vos besoins et nous préparerons nos plats pour satisfaire les critères les plus importants, à la fois esthétiques et gustatifs.</p>
                    <Table className='text-center' striped bordered hover>
                        <thead>
                            <tr className='bg-warning'>
                                <th colSpan={3}>-- Nos coordonnées --</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><FiPhoneCall /></td>
                                <td>Téléphone</td>
                                <td>01 23 45 67 89</td>
                            </tr>
                            <tr>
                                <td><ImMobile /></td>
                                <td>Portable</td>
                                <td>01 98 76 54 32</td>
                            </tr>
                            <tr>
                                <td><AiOutlineMail /></td>
                                <td>Email</td>
                                <td>contact@pizza-delicious.com</td>
                            </tr>
                        </tbody>
                    </Table>
                </Col>
                <Col md={6}>
                    <img src="images/Black_pizza-logo.jpg" alt="Logo de la pizzéria" className="img-fluid" />
                </Col>
            </Row>
        </Container>
    </>
  )
}

export default Contact