import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../assets/styles/create-topic.css';

const CreateTopic = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/forums', formData);
      navigate('/forums');
    } catch (error) {
      console.error('Error creating topic:', error);
    }
  };

  return (
    <div className="create-topic-container">
      <h1>Створити нову тему</h1>
      <form onSubmit={handleSubmit} className="create-topic-form">
        <label>
          Назва теми:
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Опис теми:
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </label>
        <button type="submit">Створити</button>
      </form>
    </div>
  );
};

export default CreateTopic;
