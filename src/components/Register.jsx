import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import axios from 'axios';
import bcrypt from 'bcryptjs';

const salt = bcrypt.genSaltSync(10);

const EMAIL_REGEX = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const Register = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState();
    const [validEmail, setValidEmail] = useState(false);
    const [password, setPassword] = useState('');
    const [validPassword, setValidPassword] = useState(false);
    const [confirm, setConfirm] = useState('');
    const [validConfirm, setValidConfirm] = useState(false);
    const [checked, setChecked] = useState(false);

    const [error, setError] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');

    useEffect(() => {
        const result = EMAIL_REGEX.test(email);
        setValidEmail(result);
    }, [email])

    useEffect(() => {
        const result = PWD_REGEX.test(password);
        setValidPassword(result);
        const match = password === confirm;
        setValidConfirm(match);
    }, [password, confirm])

    useEffect(() => {
        setValidEmail(true);
        setValidPassword(true);
        setValidConfirm(true);
    }, [])

    const handleCheckbox = (e) => {
        setChecked(e.target.checked)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const v1 = PWD_REGEX.test(password);
        const v2 = EMAIL_REGEX.test(email);
        if (!v1 || !v2) {
            setError('true');
            setErrorMsg('Please enter a valid email address and password.');
            return;
        }
        if (!checked) {
            setError('true');
            setErrorMsg('You must accept our terms of service.');
            return;
        }
        
        try {
            const response = await axios.post('http://localhost:8080/user/adduser',
                {
                    email: email,
                    password: bcrypt.hashSync(password, salt)
                },
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
            console.log(response);
            if(response.data.code === 409) {
                setError('true');
                setErrorMsg(response.data.message);
            } else if (response.data.code === 400) {
                setError('true');
                setErrorMsg(response.data.message);
            } else if (response.data.code === 200) {
                navigate("../login", { replace: true })
            }

        } catch (err) {
            console.log(err.response);
        } 
    }

    return (
        <Container>
            <h1 className='text-center mt-5'>Registration</h1>
            <p className='alert alert-danger' hidden={!error}>{errorMsg}</p>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" onChange={(e) => setEmail(e.target.value)} />
                    <p className='alert alert-danger' hidden={validEmail}>Please enter a valid email.</p>
                    <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                    <p className='alert alert-danger' hidden={validPassword}>Please enter a valid password.</p>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicConfirm">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control type="password" placeholder="Confirm Password" onChange={(e) => setConfirm(e.target.value)} />
                    <p className='alert alert-danger' hidden={validConfirm}>Your password and confirmed password don't match.</p>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="Do you agree with our terms of service ?" onChange={(e) => handleCheckbox(e)}/>
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </Container>
    )
}

export default Register