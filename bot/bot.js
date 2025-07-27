const TelegramBot = require('node-telegram-bot-api');
const Task = require('../models/Task');

const token = process.env.TELEGRAM_BOT_TOKEN;
const bot = new TelegramBot(token, { polling: true });

// Start Command
bot.onText(/\/start/, (msg) => {
  bot.sendMessage(msg.chat.id, '👋 Welcome! Use /add, /list, /done to manage tasks.');
});

// Add Task
bot.onText(/\/add (.+)/, async (msg, match) => {
  const taskText = match[1];
  await Task.create({ userId: msg.chat.id, task: taskText });
  bot.sendMessage(msg.chat.id, `✅ Task added: ${taskText}`);
});

// List Tasks
bot.onText(/\/list/, async (msg) => {
  const tasks = await Task.find({ userId: msg.chat.id, isCompleted: false });
  if (tasks.length === 0) return bot.sendMessage(msg.chat.id, '🎉 No pending tasks!');
  
  const message = tasks.map((t, i) => `${i + 1}. ${t.task} (/done${t._id})`).join('\n');
  bot.sendMessage(msg.chat.id, `📋 Your tasks:\n\n${message}`);
});

// Mark as Done
bot.onText(/\/done(.+)/, async (msg, match) => {
  const taskId = match[1];
  await Task.findByIdAndUpdate(taskId, { isCompleted: true });
  bot.sendMessage(msg.chat.id, '✅ Task marked as done by sukhvinder!');
});
const schedule = require('node-schedule');
const dayjs = require('dayjs');

// Reminder command: /remind HH:MM Task
bot.onText(/\/remind (\d{1,2}:\d{2}) (.+)/, (msg, match) => {
  const chatId = msg.chat.id;
  const time = match[1];       // "18:30"
  const task = match[2];       // "Take medicine"

  const [hour, minute] = time.split(':').map(Number);
  const now = dayjs();
  const reminderTime = now.hour(hour).minute(minute).second(0);

  if (reminderTime.isBefore(now)) {
    bot.sendMessage(chatId, "⏰ That time has already passed today. Try a future time.");
    return;
  }

  // Schedule the notification
  schedule.scheduleJob(reminderTime.toDate(), () => {
    bot.sendMessage(chatId, `🔔 *Reminder:* ${task}`, {
      parse_mode: 'Markdown'
    });
  });

  bot.sendMessage(chatId, `✅ Reminder set for *${time}*:\n${task}`, {
    parse_mode: 'Markdown'
  });
});

module.exports = bot;
