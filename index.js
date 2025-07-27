require('dotenv').config();
const mongoose = require('mongoose');

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('MongoDB connected');
  require('./bot/bot'); // Start bot
}).catch(err => console.error(err));
const express = require('express');
const app = express();

app.get('/', (req, res) => res.send('Telegram bot is running!'));
app.listen(5000, () => console.log('HTTP endpoint live on port 3000'));
