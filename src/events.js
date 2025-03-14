const bot = require("./bot");

// Chào mừng thành viên mới
bot.on("new_chat_members", (msg) => {
  const chatId = msg.chat.id;
  msg.new_chat_members.forEach((member) => {
    bot.sendMessage(
      chatId,
      `🎉 Chào mừng ${member.first_name} đến với The Honeycomb Riches Squad!`
    );
  });
});

module.exports = bot;
