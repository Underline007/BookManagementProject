import React from 'react';
import { Form, Input, Button, message } from 'antd';
import { register } from '../services/authServices';

const RegisterForm = () => {
    const onFinish = async (values) => {
        try {
            await register(values);
            message.success('Registration successful');
        } catch (error) {
            message.error('Registration failed');
        }
    };

    return (
        <Form onFinish={onFinish} layout="vertical">
            <Form.Item
                name="name"
                label="Name"
                rules={[{ required: true, message: 'Please input your name!' }]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                name="email"
                label="Email"
                rules={[
                    { required: true, message: 'Please input your email!' },
                    { type: 'email', message: 'The input is not valid E-mail!' }
                ]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                name="password"
                label="Password"
                rules={[
                    { required: true, message: 'Please input your password!' },
                    { min: 6, message: 'Password must be at least 6 characters!' }
                ]}
            >
                <Input.Password />
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit">Register</Button>
            </Form.Item>
        </Form>
    );
};

export default RegisterForm;
