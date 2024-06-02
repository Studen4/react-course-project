import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../assets/styles/personal-page.css';

const PersonalPage = () => {
  const [username, setUsername] = useState('');

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  return (
    <div className="personal-page-container">
      <h1>Кабінет користувача</h1>
      <h2>{username}</h2>
      <div className="buttons-container">
        <Link to="/create-topic" className="personal-page-button">Створити тему на форумі</Link>
        <Link to="/create-sale" className="personal-page-button">Створити продаж товару в магазині</Link>
        <Link to="/profile-settings" className="personal-page-button">Налаштування профілю</Link>
      </div>
    </div>
  );
};

export default PersonalPage;