// src/components/BookForm.js
import React, { useState, useEffect } from 'react';
import { Form, Input, DatePicker, Button, message } from 'antd';
import dayjs from 'dayjs';
import { createBook, updateBook, getBook } from '../services/bookServices';
import { useNavigate, useParams } from 'react-router-dom';
import moment from 'moment';

const BookForm = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const { id } = useParams();
    const [book, setBook] = useState(null);

    useEffect(() => {
        if (id) {
            loadBook(id);
        }
    }, [id]);

    const loadBook = async (id) => {
        try {
            const response = await getBook(id);
            setBook(response.data);
            form.setFieldsValue({
                ...response.data,
                releaseDate: moment(response.data.releaseDate),
            });
        } catch (error) {
            message.error('Failed to load book');
        }
    };

    const onFinish = async (values) => {
        try {
            if (book) {
                await updateBook(id, values);
                message.success('Book updated successfully');
            } else {
                await createBook(values);
                message.success('Book created successfully');
            }
            navigate('/');
        } catch (error) {
            message.error('Failed to save book');
        }
    };

    const validateDate = (date) => {
        return dayjs(date).isValid();
    };

    return (
        <Form form={form} onFinish={onFinish} layout="vertical">
            <Form.Item name="name" label="Name" rules={[{ required: true }]}>
                <Input />
            </Form.Item>
            <Form.Item name="description" label="Description" rules={[{ required: true }]}>
                <Input />
            </Form.Item>
            <Form.Item
                name="releaseDate"
                label="Release Date"
                rules={[
                    { required: true, message: 'Please select a release date' },
                    { validator: (_, value) => validateDate(value) ? Promise.resolve() : Promise.reject('Invalid date') }
                ]}
            >
                <DatePicker />
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit">
                    {book ? 'Update' : 'Create'}
                </Button>
            </Form.Item>
        </Form>
    );
};

export default BookForm;
