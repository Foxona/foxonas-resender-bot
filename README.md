## Installation

1. Clone the repository
2. Run `npm install` to install dependencies
3. Create a `.env` file with the following variables:
   - `TELEGRAM_BOT_TOKEN`: Your Telegram bot token
   - `TELEGRAM_POST_CHANNEL_NAME`: The name of the channel to forward messages from
   - `TELEGRAM_POST_CHAT_NAME`: The name of the chat to forward messages to
   - `TELEGRAM_POST_CHANNEL_ID`: The ID of the channel to forward messages from
4. Run `npm start` to start the bot

## Usage

Once the bot is running, it will automatically forward any messages posted in the specified channel to the specified chat after a delay of 80 seconds.