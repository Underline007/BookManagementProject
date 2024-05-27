// src/components/Login.js
import React, { useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import { login } from '../services/authServices';

const LoginForm = ({ setToken }) => {
    const [loading, setLoading] = useState(false);

    const onFinish = async (values) => {
        setLoading(true);
        try {
            const response = await login(values);
            setToken(response.token);
            message.success('Login successful!');
        } catch (error) {
            message.error('Login failed!');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Form name="login" onFinish={onFinish}>
            <Form.Item
                name="email"
                rules={[{ required: true, message: 'Please input your email!' }]}
            >
                <Input placeholder="Email" />
            </Form.Item>
            <Form.Item
                name="password"
                rules={[{ required: true, message: 'Please input your password!' }]}
            >
                <Input.Password placeholder="Password" />
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit" loading={loading}>
                    Login
                </Button>
            </Form.Item>
        </Form>
    );
};

export default LoginForm;
