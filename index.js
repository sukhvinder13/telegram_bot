require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const app = express();

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('✅ MongoDB connected');
  require('./bot/bot'); // Start your Telegram bot
}).catch(err => console.error('❌ MongoDB connection error:', err));

// Simple HTTP endpoint (optional for Railway)
app.get('/', (req, res) => res.send('🤖 Telegram bot is running!'));

// Start server (for Railway to detect port)
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🌐 HTTP endpoint live on port ${PORT}`);
});
