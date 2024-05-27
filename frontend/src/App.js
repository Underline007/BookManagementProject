// src/App.js
import React, { useState, useEffect } from 'react';
import 'antd/dist/reset.css';
import './App.css';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import Login from './components/LoginForm';
import BookList from './components/BookList';
import RegisterForm from './components/RegisterForm';
import BookForm from './components/BookForm';
import { getToken, logout } from './services/authServices';
import { Button } from 'antd';

const App = () => {
  const [token, setToken] = useState(getToken());
  const [isRegistering, setIsRegistering] = useState(false);

  useEffect(() => {
    setToken(getToken());
  }, []);

  const handleLogout = () => {
    logout();
    setToken(null);
  };

  return (
    <Router>
      <div className="App">
        {!token ? (
          isRegistering ? (
            <RegisterForm />
          ) : (
            <Login setToken={setToken} />
          )
        ) : (
          <>
            <Routes>
              <Route path="/" element={<BookList />} />
              <Route path="/edit/:id" element={<BookForm />} />
              <Route path="/create" element={<BookForm />} />
            </Routes>
            <Button type="link" onClick={handleLogout}>
              Logout
            </Button>
          </>
        )}
        {!token && (
          <Button type="link" onClick={() => setIsRegistering(!isRegistering)}>
            {isRegistering ? 'Login' : 'Register'}
          </Button>
        )}
      </div>
    </Router>
  );
};

export default App;
