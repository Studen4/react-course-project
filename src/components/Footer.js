import React, { useState } from 'react';

const Footer = () => {
  const generateRandomCode = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let code = '';
    for (let i = 0; i < 16; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      code += characters[randomIndex];
      if ((i + 1) % 4 === 0 && i !== 15) {
        code += '-';
      }
    }
    return code;
  };

  const [sessionCode, setSessionCode] = useState(generateRandomCode());

  const regenerateCode = () => {
    setSessionCode(generateRandomCode());
  };

  return (
    <footer>
      <p>Код поточної сессії: {sessionCode}</p>
    </footer>
  );
};

export default Footer;