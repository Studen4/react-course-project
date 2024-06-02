import React, { useState, useEffect } from 'react';
import { Link, Navigate } from 'react-router-dom';
import '../assets/styles/login.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginMessage, setLoginMessage] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      });

      const message = await response.text();
      setLoginMessage(message);

      if (response.ok) {
        localStorage.setItem('isLoggedIn', true);
        localStorage.setItem('username', username);
        setIsLoggedIn(true);
      }
    } catch (error) {
      setLoginMessage('Error logging in');
    }
  };

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (isLoggedIn) {
      setIsLoggedIn(true);
    }
  }, []);

  if (isLoggedIn) {
    return <Navigate to="/forum" />;
  }

  return (
    <div className="form-container">
      <h2>Увійти</h2>
      <form id="loginForm" onSubmit={handleSubmit}>
        <div>
          <label>Нікнейм:</label>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
        </div>
        <div>
          <label>Пароль:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <button type="submit">ОК</button>
      </form>
      <p id="loginMessage">{loginMessage}</p>
      <p>Якщо ви не зареєстровані, <Link to="/register">зареєструйтесь тут</Link></p>
    </div>
  );
};

export default Login;