const express = require('express');
const http = require('http');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const { Pool } = require('pg');

const app = express();
const server = http.createServer(app);
const port = 5000;

const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: 5432
});

app.use(bodyParser.json());
app.use(cors());
app.use(express.static(path.join(__dirname, '../public')));

app.get('/forums', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM Forum ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

app.post('/register', async (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const client = await pool.connect();
  try {
    await client.query('INSERT INTO users (username, password) VALUES ($1, $2)', [username, hashedPassword]);
    res.status(201).send('User registered');
  } catch (err) {
    res.status(500).send('Error registering user');
  } finally {
    client.release();
  }
});

app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const client = await pool.connect();
  try {
    const result = await client.query('SELECT * FROM users WHERE username = $1', [username]);
    const user = result.rows[0];
    if (user && await bcrypt.compare(password, user.password)) {
      res.status(200).send('Login successful');
    } else {
      res.status(401).send('Invalid credentials');
    }
  } catch (err) {
    res.status(500).send('Error logging in');
  } finally {
    client.release();
  }
});

app.post('/forums', async (req, res) => {
  const { title, description } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO Forum (title, description) VALUES ($1, $2) RETURNING *',
      [title, description]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

app.get('/topics/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const topicResult = await pool.query('SELECT * FROM Forum WHERE id = $1', [id]);
    if (topicResult.rows.length === 0) {
      return res.status(404).send('Topic not found');
    }
    const messagesResult = await pool.query('SELECT * FROM forum_messages WHERE topic_id = $1 ORDER BY date ASC', [id]);
    res.json({
      topic: topicResult.rows[0],
      messages: messagesResult.rows,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

app.post('/topics/:id/forum_messages', async (req, res) => {
  const { id } = req.params;
  const { author, text } = req.body;
  try {
    const newMessage = await pool.query(
      'INSERT INTO forum_messages (topic_id, author, text) VALUES ($1, $2, $3) RETURNING *',
      [id, author, text]
    );
    res.status(201).json(newMessage.rows[0]);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});


app.get('/current-time', async (req, res) => {
  const currentTime = await getCurrentTimeInKyiv();
  res.json({ currentTime });
});

app.get('/forums/:id/messages', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      'SELECT * FROM Messages WHERE forum_id = $1 ORDER BY created_at ASC',
      [id]
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

app.post('/forums/:id/messages', async (req, res) => {
  const { id } = req.params;
  const { author, text, created_at } = req.body;
  console.log('Received message data:', { id, author, text, created_at });

  try {
    const result = await pool.query(
      'INSERT INTO Messages (forum_id, author, text, created_at) VALUES ($1, $2, $3, $4) RETURNING *',
      [id, author, text, created_at]
    );
    console.log('Message inserted:', result.rows[0]);
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Error inserting message:', err.message);
    res.status(500).send('Server error');
  }
});

app.route('/create-sale')
  .post(async (req, res) => {
    const { photo, title, description, price, phone, email } = req.body;
    try {
      const result = await pool.query(
        'INSERT INTO Sales (photo, title, description, price, phone, email) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
        [photo, title, description, price, phone, email]
      );
      res.status(201).json(result.rows[0]);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  });

app.get('/sales', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM Sales ORDER BY id DESC');
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
}).on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.log(`Port ${port} is already in use`);
  } else {
    console.error(err);
  }
});