import * as TelegramBot from "node-telegram-bot-api";
require("dotenv").config();

const { TELEGRAM_BOT_TOKEN, TELEGRAM_POST_CHANNEL_NAME, TELEGRAM_POST_CHAT_NAME, TELEGRAM_POST_CHANNEL_ID } = process.env;

if (!TELEGRAM_BOT_TOKEN) {
  console.error("TELEGRAM_BOT_TOKEN is not set");
  process.exit(1);
}

if (!TELEGRAM_POST_CHANNEL_NAME || !TELEGRAM_POST_CHAT_NAME) {
  console.error("TELEGRAM_POST_CHANNEL_NAME or TELEGRAM_POST_CHAT_NAME is not set");
  process.exit(1);
}

const bot = new TelegramBot(TELEGRAM_BOT_TOKEN, { polling: true });

bot.on("channel_post", async (msg) => {

  const channel = await bot.getChat(TELEGRAM_POST_CHANNEL_NAME);
  if (channel.id !== Number(TELEGRAM_POST_CHANNEL_ID)) return;

  const chat = await bot.getChat(TELEGRAM_POST_CHAT_NAME);

  setTimeout(async () => {
    try {
      const res = await bot.forwardMessage(chat.id, msg.chat.id, msg.message_id);
      console.log(res);
    } catch (error) {
      console.error("Error forwarding message:", error);
    }
  }, 80000);
});
