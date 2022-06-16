import React from 'react'
import AllPizza from '../pizza-data';
import { Container, Row, Col } from "react-bootstrap";
import Pizza from '../components/Pizza';

const HomeScreen = () => {
  return (
    <>
        <Container>
            <Row>
                {
                    AllPizza.map(pizza => (
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