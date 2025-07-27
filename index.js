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
