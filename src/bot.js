const TelegramBot = require("node-telegram-bot-api");
require("dotenv").config();

const token = process.env.TELEGRAM_BOT_TOKEN;
if (!token) {
  console.error("❌ TELEGRAM_BOT_TOKEN không được cài đặt trong .env");
  process.exit(1);
}

const bot = new TelegramBot(token);
console.log("✅ Bot đã khởi tạo thành công!");

module.exports = bot;
