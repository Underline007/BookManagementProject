// src/components/BookList.js
import React, { useEffect, useState } from 'react';
import { Table, Button, Space, message } from 'antd';
import { getBooks, deleteBook } from '../services/bookServices';
import { useNavigate } from 'react-router-dom';

const BookList = () => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        loadBooks();
    }, []);

    const loadBooks = async () => {
        setLoading(true);
        try {
            const response = await getBooks();
            setBooks(response.data);
            setLoading(false);
        } catch (error) {
            message.error('Failed to load books');
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        try {
            await deleteBook(id);
            message.success('Book deleted successfully');
            loadBooks();
        } catch (error) {
            message.error('Failed to delete book');
        }
    };

    const handleEdit = (id) => {
        navigate(`/edit/${id}`);
    };

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
        },
        {
            title: 'Release Date',
            dataIndex: 'releaseDate',
            key: 'releaseDate',
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (text, record) => (
                <Space>
                    <Button type="primary" onClick={() => handleEdit(record.id)}>Edit</Button>
                    <Button type="danger" onClick={() => handleDelete(record.id)}>Delete</Button>
                </Space>
            ),
        },
    ];

    return (
        <>
            <Button type="primary" onClick={() => navigate('/create')} style={{ marginBottom: 16 }}>
                Add Book
            </Button>
            <Table dataSource={books} columns={columns} rowKey="id" loading={loading} />
        </>
    );
};

export default BookList;
