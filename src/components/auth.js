import React, { useState } from 'react';

const Auth = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginMessage, setLoginMessage] = useState('');
  const [registerMessage, setRegisterMessage] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
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
        // Redirect or perform any action upon successful login
        window.location.href = '/forum';
      }
    } catch (error) {
      setLoginMessage('Error logging in');
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      });

      const message = await response.text();
      setRegisterMessage(message);

      if (response.ok) {
        // Redirect or perform any action upon successful registration
        window.location.href = '/login';
      }
    } catch (error) {
      setRegisterMessage('Error registering user');
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form id="loginForm" onSubmit={handleLogin}>
        <div>
          <label>Username:</label>
          <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} required />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <button type="submit">Login</button>
      </form>
      <p id="loginMessage">{loginMessage}</p>

      <h2>Register</h2>
      <form id="registerForm" onSubmit={handleRegister}>
        <div>
          <label>Username:</label>
          <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} required />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <button type="submit">Register</button>
      </form>
      <p id="registerMessage">{registerMessage}</p>
    </div>
  );
};

export default Auth;