import * as TelegramBot from "node-telegram-bot-api";

require("dotenv").config();

const { TELEGRAM_BOT_TOKEN, TELEGRAM_POST_FROM_CHANNEL_ID, TELEGRAM_POST_TO_CHAT_ID } = process.env;

/// Check if the required environment variables are set
if (!TELEGRAM_BOT_TOKEN) {
  console.error("TELEGRAM_BOT_TOKEN is not set");
  process.exit(1);
}

if (!TELEGRAM_POST_FROM_CHANNEL_ID || !TELEGRAM_POST_TO_CHAT_ID) {
  console.error("TELEGRAM_POST_FROM_CHANNEL_ID or TELEGRAM_POST_TO_CHAT_ID is not set");
  process.exit(1);
}

const bot = new TelegramBot(TELEGRAM_BOT_TOKEN, { polling: true });

// Log errors
bot.on("polling_error", (error) => {
  console.error("Polling error:", error);
});

// If there is a new post in the Channel, repost it to the Group
bot.on("channel_post", async (msg) => {
  if (msg.chat.id.toString() === TELEGRAM_POST_FROM_CHANNEL_ID) {
    await new Promise((resolve) => setTimeout(resolve, 60000)); // 60 second delay
    try {
      bot.forwardMessage(TELEGRAM_POST_TO_CHAT_ID, msg.chat.id, msg.message_id);
      console.log("Forwarded message from channel to group");
    } catch (error) {
      console.error("Error forwarding message:", error);
    }
  }
});