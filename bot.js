const TelegramBot = require("node-telegram-bot-api");
const express = require("express");

const token = "7837982459:AAE1bk8saRV30PwNg5yV-c77JZvBHBOC63o";
const bot = new TelegramBot(token, { polling: true });

const app = express();

app.use(express.json());

app.post(`/bot${token}`, (req, res) => {
  bot.processUpdate(req.body);
  res.sendStatus(200);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

const webhookUrl = `https://hts-bee-bot.onrender.com/bot${token}`;
bot.setWebHook(webhookUrl);

bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(
    chatId,
    "Xin chào! Em là Bee Bot của The Honeycomb Riches Squad."
  );
});

// Xử lý tin nhắn văn bản thông thường
bot.on("message", (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text;

  // Bot sẽ trả lời khi có ai đó nhắc tên bot
  if (text && text.includes(`@${msg.bot.username}`)) {
    bot.sendMessage(chatId, `Bạn vừa nhắc tôi: "${text}"`);
  }
});
