# Встановлення базового образу
FROM node:14

# Встановлення робочого каталогу
WORKDIR /app

# Копіювання package.json та package-lock.json
COPY package*.json ./

# Встановлення залежностей
RUN npm install

# Копіювання всього проекту
COPY . .

# Копіювання файлу .env
COPY .env .env

# Експонування порту, який вказано в .env
EXPOSE ${PORT}

# Команда для запуску додатку
CMD ["sh", "-c", "node server/server.js & npm start"]
