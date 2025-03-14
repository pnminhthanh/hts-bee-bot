const express = require("express");
const bot = require("./bot");
require("dotenv").config();

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;
const webhookUrl = `https://hts-bee-bot.onrender.com/bot${process.env.TELEGRAM_BOT_TOKEN}`;

bot
  .setWebHook(webhookUrl)
  .then(() => console.log(`✅ Webhook đã đặt tại: ${webhookUrl}`))
  .catch((error) => console.error("❌ Lỗi khi set webhook:", error));

app.post(`/bot${process.env.TELEGRAM_BOT_TOKEN}`, (req, res) => {
  bot.processUpdate(req.body);
  res.sendStatus(200);
});

app.listen(PORT, () => console.log(`🚀 Server đang chạy trên cổng ${PORT}`));
