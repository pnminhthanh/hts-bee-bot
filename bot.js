const TelegramBot = require("node-telegram-bot-api");
const express = require("express");

const token = process.env.TELEGRAM_BOT_TOKEN;
const bot = new TelegramBot(token);

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

bot.on("message", (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text;

  if (text && text.includes(`@${msg.bot.username}`)) {
    bot.sendMessage(chatId, `Bạn vừa nhắc tôi: "${text}"`);
  }
});
