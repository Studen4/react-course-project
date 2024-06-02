import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../assets/styles/topic.css';

const Topic = () => {
  const { id } = useParams();
  const [username, setUsername] = useState('User');
  const [topic, setTopic] = useState({});
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername);
    }

    const fetchTopicData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/topics/${id}`);
        setTopic(response.data.topic);
        setMessages(response.data.messages);
      } catch (error) {
        console.error('Error fetching topic data:', error);
      }
    };
    fetchTopicData();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newMessage.trim()) {
      const message = {
        author: username,
        text: newMessage,
      };
      try {
        const response = await axios.post(`http://localhost:5000/topics/${id}/forum_messages`, message);
        setMessages([...messages, response.data]);
        setNewMessage('');
      } catch (error) {
        console.error('Error creating message:', error);
      }
    }
  };

  return (
    <div className="topic-container">
      <h2>{topic.title}</h2>
      <p className="topic-description">{topic.description}</p>
      <div className="messages">
        {messages.map((message) => (
          <div key={message.id} className="message">
            <div className="message-author">{message.author}</div>
            <div className="message-text">{message.text}</div>
            <div className="message-date">{new Date(message.date).toLocaleString()}</div>
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit}>
        <textarea
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Ваше повідомлення..."
          required
        />
        <button type="submit">Відправити</button>
      </form>
    </div>
  );
};

export default Topic;
