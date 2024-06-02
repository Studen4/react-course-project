import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../assets/styles/chat.css';
import { getCurrentTimeInKyiv } from '../components/OnlineStatus';

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [username, setUsername] = useState('User');

  const fetchMessages = async () => {
    try {
      const response = await axios.get('http://localhost:5000/forums/1/messages');
      setMessages(response.data);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername);
    }
    fetchMessages();
  }, []);

  const handleSendMessage = async () => {
    try {
      const currentTime = await getCurrentTimeInKyiv();
      await axios.post('http://localhost:5000/forums/1/messages', {
        forum_id: 1,
        author: username,
        text: newMessage,
        created_at: currentTime
      });
      setNewMessage('');
      fetchMessages();
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <div className="chat-container">
      <h1 className="chat-header">Кімната для чату</h1>
      <div className="chat-messages">
        {messages.map((message) => (
          <div className="chat-message" key={message.id}>
            <strong>{message.author}: </strong>
            {message.text} - {message.created_at}
          </div>
        ))}
      </div>
      <div className="chat-input-container">
        <input
          type="text"
          className="chat-input"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Введіть своє повідомлення..."
        />
        <button className="chat-button" onClick={handleSendMessage}>Відправити!</button>
      </div>
    </div>
  );
};

export default Chat;