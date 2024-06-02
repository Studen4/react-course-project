-- Створення бази даних (якщо потрібно)
CREATE DATABASE IF NOT EXISTS forum;

-- Таблиця "forum"
DROP TABLE IF EXISTS public.forum;
CREATE TABLE IF NOT EXISTS public.forum (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Таблиця "forum_messages"
DROP TABLE IF EXISTS public.forum_messages;
CREATE TABLE IF NOT EXISTS public.forum_messages (
    id SERIAL PRIMARY KEY,
    topic_id INTEGER NOT NULL,
    author VARCHAR(255) NOT NULL,
    text TEXT NOT NULL,
    date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (topic_id) REFERENCES public.forum (id)
);

-- Таблиця "messages"
DROP TABLE IF EXISTS public.messages;
CREATE TABLE IF NOT EXISTS public.messages (
    forum_id VARCHAR(255) DEFAULT '1',
    author VARCHAR(255) NOT NULL,
    text TEXT NOT NULL,
    created_at VARCHAR(255) NOT NULL
);

-- Таблиця "sales"
DROP TABLE IF EXISTS public.sales;
CREATE TABLE IF NOT EXISTS public.sales (
    id SERIAL PRIMARY KEY,
    photo TEXT,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    price VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    email VARCHAR(255)
);

-- Таблиця "users"
DROP TABLE IF EXISTS public.users;
CREATE TABLE IF NOT EXISTS public.users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    password TEXT NOT NULL,
    UNIQUE (username)
);
