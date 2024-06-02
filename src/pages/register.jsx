import React, { useState, useEffect } from 'react';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [registerMessage, setRegisterMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
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
        // Redirect upon successful registration
        window.location.href = '/forum';
      }
    } catch (error) {
      setRegisterMessage('Error registering user');
    }
  };

  useEffect(() => {
    // Check if user is already logged in, then redirect
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (isLoggedIn) {
      window.location.href = '/forum';
    }
  }, []);

  return (
    <div className="form-container">
      <h2>Реєстрація</h2>
      <form id="registerForm" onSubmit={handleSubmit}>
        <div>
          <label>Нікнейм:</label>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
        </div>
        <div>
          <label>Пароль:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <button type="submit">Зареєструватись!</button>
      </form>
      <p id="registerMessage">{registerMessage}</p>
    </div>
  );
};

export default Register;
