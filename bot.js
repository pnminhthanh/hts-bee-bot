const TelegramBot = require("node-telegram-bot-api");
const express = require("express");

const token = process.env.TELEGRAM_BOT_TOKEN;
if (!token) {
  console.error(
    "Error: TELEGRAM_BOT_TOKEN is not set in environment variables."
  );
  process.exit(1);
}
const bot = new TelegramBot(token);

const app = express();

app.use(express.json());

app.post(`/bot${token}`, (req, res) => {
  console.log("Received request:", req.body);
  bot.processUpdate(req.body);
  res.sendStatus(200);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

const webhookUrl = `https://hts-bee-bot.onrender.com/bot${token}`;
bot
  .setWebHook(webhookUrl)
  .then(() => {
    console.log(`Webhook set to ${webhookUrl}`);
  })
  .catch((error) => {
    console.error("Error setting webhook:", error);
  });

bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  console.log(`/start command received from chatId: ${chatId}`);
  bot
    .sendMessage(
      chatId,
      "Xin chào! Em là Bee Bot của The Honeycomb Riches Squad."
    )
    .catch((error) => {
      console.error("Error sending /start message:", error);
    });
});

bot.on("message", (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text;
  console.log("Received message:", msg);

  const isBotMentioned =
    text &&
    msg.bot &&
    msg.bot.username &&
    text.includes(`@${msg.bot.username}`);

  if (isBotMentioned) {
    bot.sendMessage(chatId, `Bạn vừa nhắc tôi: "${text}"`).catch((error) => {
      console.error("Error sending mention response:", error);
    });
  }
});
