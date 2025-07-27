const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  userId: String,
  task: String,
  isCompleted: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Task', taskSchema);
