import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Footer from '../components/Footer.js';
import { getOnlineUsersCount, getCurrentTimeInKyiv, addUserToOnlineList, removeUserFromOnlineList } from '../components/OnlineStatus';
import '../assets/styles/forum.css';
import bannerImage from '../assets/images/banner.png';
import advertImage from '../assets/images/advertise.png';
import avatarImage from '../assets/images/avatar.png';
import radioImage from '../assets/images/radio.png';
import radioMusic from '../assets/music/radio.mp3';

const Forum = () => {
  const [username, setUsername] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [topics, setTopics] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audio] = useState(new Audio(radioMusic));

  const handleLogout = () => {
    setUsername('');
    setIsLoggedIn(false);
    localStorage.removeItem('isLoggedIn');
    removeUserFromOnlineList(username);
  };

  const toggleMusic = () => {
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    const storedIsLoggedIn = localStorage.getItem('isLoggedIn');
    setUsername(storedUsername);
    setIsLoggedIn(storedIsLoggedIn === 'true');

    if (storedIsLoggedIn === 'true') {
      addUserToOnlineList(storedUsername);
    }

    const fetchTopics = async () => {
      try {
        const response = await axios.get('http://localhost:5000/forums');
        setTopics(response.data);
      } catch (error) {
        console.error('Error fetching topics:', error);
      }
    };

    fetchTopics();

    return () => {
      audio.pause();
      audio.currentTime = 0;
    };
  }, [audio]);

  return (
    <div className="forum-container">
      <div className="navbar">
        <div className="nav-links">
          <Link to="/chat" className="nav-link">Чат</Link>
          <Link to="/marketplace" className="nav-link">Магазин</Link>
        </div>
        <div className="banner">
          <img src={bannerImage} alt="Banner" />
        </div>
        <div className="user-info">
          <Link to="/personal-page">
            <img src={avatarImage} alt="Avatar" className="avatar" />
          </Link>
          <div className="username">{isLoggedIn ? username : 'Гість'}</div>
          {isLoggedIn ? (
            <button onClick={handleLogout}>Вийти</button>
          ) : (
            <Link to="/login">Увійти</Link>
          )}
        </div>
      </div>
      <div className="main-content">
        <div className="topics">
          <h2>Теми на форумі:</h2>
          {topics.map(topic => (
            <Link to={`/topic/${topic.id}`} key={topic.id} className="topic">
              <h3>{topic.title}</h3>
              <p>{topic.description}</p>
            </Link>
          ))}
        </div>
        <div className="sidebar">
          <div className="announcements">
            <h2>Оголошення</h2>
            <div className="announcement">
              <img src={advertImage} alt="Advertise" />
              <p><h3>А також куплю бурштин (15 кг)</h3></p>
            </div>
          </div>
          <div className="online-status">
            <h2>Онлайн</h2>
            <div className="status-info">
              <div>
                <p>Загальний онлайн сайту: {getOnlineUsersCount()}</p>
                <p>Поточний час: {getCurrentTimeInKyiv()}</p>
              </div>
              <img src={radioImage} alt="Radio" className="radio-icon" onClick={toggleMusic} />
            </div>
          </div>
        </div>
      </div>
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default Forum;