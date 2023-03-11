process.env.NTBA_FIX_319 = "test";

// Require our Telegram helper package
const TelegramBot = require("node-telegram-bot-api");

const bot = new TelegramBot(process.env.TELEGRAM_API_KEY);

module.exports = bot;
