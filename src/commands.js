const axios = require("axios");
const bot = require("./bot");

// Lệnh /start
bot.onText(/\/start/, (msg) => {
  bot.sendMessage(
    msg.chat.id,
    "Xin chào! Em là Bee Bot của The Honeycomb Riches Squad."
  );
});

// Lệnh /price [coin]
bot.onText(/\/price (.+)/, async (msg, match) => {
  const chatId = msg.chat.id;
  const coin = match[1].toLowerCase();

  try {
    const response = await axios.get(
      `https://api.coingecko.com/api/v3/simple/price?ids=${coin}&vs_currencies=usd`
    );
    const price = response.data[coin]?.usd;

    if (price) {
      bot.sendMessage(
        chatId,
        `💰 Giá ${coin.toUpperCase()} hiện tại: $${price}`
      );
    } else {
      bot.sendMessage(chatId, `⚠️ Không tìm thấy giá cho ${coin}`);
    }
  } catch (error) {
    bot.sendMessage(chatId, "🚨 Lỗi khi lấy giá coin. Vui lòng thử lại sau.");
  }
});

module.exports = bot;
