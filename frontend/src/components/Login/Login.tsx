import React, { ChangeEvent, FC, useState } from 'react';
import { ILoginFields } from '../../interfaces/ILoginFields';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import { getUserInfo, login } from '../../services/apiService';
import { PROFILE_ENDPOINT } from '../../services/apiEndpoints';


const Login: FC = () => {
    const { control, handleSubmit, setError, clearErrors, reset, formState: { errors }, setValue } = useForm<ILoginFields>();
    const navigate = useNavigate();

    const onSubmit: SubmitHandler<ILoginFields> = async (data) => {
        try {
            await login(data);
            // reset(); // Reset form fields
            //  await getUserInfo()
            navigate('/profile');
            // Handle success (redirect, show success message, etc.)
        } catch (error) {
            console.log('Login failed:', error);
            // Handle error (display error message, etc.)
        }
    }

    return (
        <Container className="p-4 box" >
            <Row>
                <Col md={8}>
                    <h2 className="text-center mb-4">Sign in</h2>
                </Col>
            </Row>

            <Form onSubmit={handleSubmit(onSubmit)}>
                <Row>
                    <Form.Group controlId="formEmail">
                        <Form.Label>Email</Form.Label>
                        <Controller
                            name="email"
                            control={control}
                            rules={{ required: true, pattern: /^\S+@\S+\.\S+$/ }}
                            render={({ field }) => <Form.Control type="email" isInvalid={!!errors.email} {...field} />}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.email && "A valid email is required"}
                        </Form.Control.Feedback>
                    </Form.Group>
                </Row>

                <Row>
                    <Form.Group controlId="formPassword">
                        <Form.Label>Password</Form.Label>
                        <Controller
                            name="password"
                            control={control}
                            rules={{ required: true, pattern: /\d/ }}
                            render={({ field }) => <Form.Control type="password" isInvalid={!!errors.password} {...field} />}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.password?.type === 'required' && "Password is required"}
                        </Form.Control.Feedback>
                    </Form.Group>
                </Row>
                <Row>
                    <Button variant="primary" type="submit" className="w-100">
                        Sign in
                    </Button>
                </Row>

            </Form>
        </Container >
    );
};

export default Login;