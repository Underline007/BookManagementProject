import axios from 'axios';

const API_URL = 'https://localhost:7187/api/auth';

const register = async (registerDto) => {
    try {
        const response = await axios.post(`${API_URL}/register`, registerDto);
        return response.data;
    } catch (error) {
        throw error;
    }
};

const login = async (loginDto) => {
    try {
        const response = await axios.post(`${API_URL}/login`, loginDto);
        if (response.data.token) {
            localStorage.setItem('token', response.data.token);
        }
        return response.data;
    } catch (error) {
        throw error;
    }
};

const getToken = () => {
    return localStorage.getItem('token');
};

const logout = () => {
    localStorage.removeItem('token');
};

export { register, login, getToken, logout };
