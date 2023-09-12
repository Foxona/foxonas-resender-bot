import * as TelegramBot from "node-telegram-bot-api";
require("dotenv").config();

const token = process.env.TELEGRAM_BOT_TOKEN;
const channelName = process.env.TELEGRAM_POST_CHANNEL_NAME;
const chatName = process.env.TELEGRAM_POST_CHAT_NAME;
const channelID = Number(process.env.TELEGRAM_POST_CHANNEL_ID)

if (!token) {
  console.error("TELEGRAM_BOT_TOKEN is not set");
  process.exit(1);
}

if (!channelName || !chatName) {
  console.error(
    "TELEGRAM_POST_CHANNEL_NAME or TELEGRAM_POST_CHAT_NAME is not set"
  );
  process.exit(1);
}

const bot = new TelegramBot(token, { polling: true });

bot.on("channel_post", (msg) => {
  bot.getChat(channelName).then((channel) => {
    if (channel.id !== channelID) return;

    bot.getChat(chatName).then((chat) => {
      setTimeout(() => {
        bot
          .forwardMessage(chat.id, msg.chat.id, msg.message_id)
          .then((res) => console.log(res));
      }, 80000);
    });
  });
});
