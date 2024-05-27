import axios from 'axios';
import { getToken } from './authServices'; // Giả định rằng authService.js có hàm getToken để lấy token từ localStorage

const API_URL = 'https://localhost:7187/api/books';

const getBooks = () => {
    const token = getToken();
    return axios.get(API_URL, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
};

const getBook = (id) => {
    const token = getToken();
    return axios.get(`${API_URL}/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
};

const createBook = (book) => {
    const token = getToken();
    return axios.post(API_URL, book, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
};

const updateBook = (id, book) => {
    const token = getToken();
    return axios.put(`${API_URL}/${id}`, book, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
};

const deleteBook = (id) => {
    const token = getToken();
    return axios.delete(`${API_URL}/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
};

export {
    getBooks,
    getBook,
    createBook,
    updateBook,
    deleteBook
};
