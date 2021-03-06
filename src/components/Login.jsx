import React, { useState } from 'react';
import { useNavigate, Link } from "react-router-dom";
import { Container, Form, Button } from 'react-bootstrap';
import axios from 'axios';
import useAuth from "../hooks/useAuth";
import { useCookies } from "react-cookie";

const Login = () => {
    const { setAuth } = useAuth();
    const [cookies, setCookie] = useCookies([]);
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [error, setError] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        if(email === '' || password === '') {
            setError('true');
            setErrorMsg('You need to enter your address email and password.');
            return;
        }

        try {
            const response = await axios.post('http://localhost:8080/user/login',
                {
                    email: email,
                    password: password
                },
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

            console.log(response.data);
            if(response.data.code === 404) {
                setError('true');
                setErrorMsg(response.data.message);
            } else if(response.data.code === 403) {
                setError('true');
                setErrorMsg(response.data.message);
            } else if(response.data.code === 200) {
                //User connected
                const token = response.data.access_token;
                setAuth({email, token});
                setCookie('email', email, { path: '/' });
                setCookie('token', token, { path: '/' });
                navigate("/", { replace: true });
            }

        } catch (err) {
            console.log(err.response);
        } 
    }

    return (
        <Container>
            <h1 className='text-center mt-5'>Login</h1>
            <p className='alert alert-danger' hidden={!error}>{errorMsg}</p>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" onChange={(e) => setEmail(e.target.value)} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Sign in
                </Button>
                <Button variant="primary" type="submit" className='mx-3'>
                    <Link to="../register" className='text-light text-decoration-none'>Register a new account</Link>
                </Button>
            </Form>
        </Container>
    )
}

export default Login