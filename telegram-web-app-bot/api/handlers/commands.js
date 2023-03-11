const bot = require("../bot");

async function handleCommandStart(message) {
  const {
    chat: { id },
  } = message;

  await bot.sendMessage(id, "Open application", {
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: "Open",
            web_app: {
              url: "https://pi.oberton.io/#/telegram",
            },
          },
        ],
      ],
    },
  });
}

module.exports = {
  handleCommandStart,
};
