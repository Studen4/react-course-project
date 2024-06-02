import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../assets/styles/marketplace.css';

const Marketplace = () => {
  const [sales, setSales] = useState([]);

  useEffect(() => {
    const fetchSales = async () => {
      try {
        const response = await axios.get('http://localhost:5000/sales');
        setSales(response.data);
      } catch (error) {
        console.error('Error fetching sales:', error);
      }
    };

    fetchSales();
  }, []);


  return (
    <div className="marketplace-container">
      <h1>Магазин</h1>
      <div className="sales-list">
        {sales.map((sale) => (
          <div key={sale.id} className="sale-item">
            <img
              src={sale.photo}
              alt={sale.title}
              className="sale-photo"
            />
            <h2>{sale.title}</h2>
            <p>{sale.description}</p>
            <p><strong>Price:</strong> {sale.price}</p>
            <p><strong>Phone:</strong> {sale.phone}</p>
            <p><strong>Email:</strong> {sale.email}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Marketplace;