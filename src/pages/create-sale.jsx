import React, { useState } from 'react';
import axios from 'axios';
import '../assets/styles/create-sale.css';

const CreateSale = () => {
  const [formData, setFormData] = useState({
    photo: '',
    title: '',
    description: '',
    price: '',
    phone: '',
    email: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/create-sale', {
        photo: formData.photo,
        title: formData.title,
        description: formData.description,
        price: formData.price,
        phone: formData.phone,
        email: formData.email
      });
      console.log('Sale created:', response.data);
    } catch (error) {
      if (error.response) {
        // У відповіді сервера є статус та дані
        console.error('Error creating sale:', error.response.status, error.response.data);
      } else if (error.request) {
        // Запит було зроблено, але не отримано відповідь
        console.error('No response received:', error.request);
      } else {
        // Виникла помилка при налаштуванні запиту
        console.error('Error setting up request:', error.message);
      }
    }
  };

  return (
    <div className="create-sale-container">
      <h1>Створити продаж товару</h1>
      <form onSubmit={handleSubmit} className="create-sale-form">
        <label>
          Фото товару           
          (посилання з Tenor, Imgur, Pineterest, Imgbb):
          <input type="text" name="photo" value={formData.photo} onChange={handleChange} required />
        </label>
        <label>
          Назва товару:
          <input type="text" name="title" value={formData.title} onChange={handleChange} required />
        </label>
        <label>
          Опис товару:
          <textarea name="description" value={formData.description} onChange={handleChange} required />
        </label>
        <label>
          Ціна в євро:
          <input type="number" name="price" value={formData.price} onChange={handleChange} required />
        </label>
        <label>
          Телефон:
          <input type="text" name="phone" value={formData.phone} onChange={handleChange} />
        </label>
        <label>
          Пошта:
          <input type="email" name="email" value={formData.email} onChange={handleChange} />
        </label>
        <button type="submit">Створити продаж</button>
      </form>
    </div>
  );
};

export default CreateSale;