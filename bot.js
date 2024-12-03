const TelegramBot = require("node-telegram-bot-api");

// Thay YOUR_API_TOKEN bằng API Token bạn lấy từ BotFather
const token = "7837982459:AAE1bk8saRV30PwNg5yV-c77JZvBHBOC63o";

// Tạo bot với chế độ "polling" (liên tục lắng nghe)
const bot = new TelegramBot(token, { polling: true });

// Xử lý khi người dùng gõ lệnh /start
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
