const bot = require("../bot");

async function handleEditionMint(message) {
  const { payload } = message;

  try {
    await bot.sendMessage(payload.chatId, payload.message);
  } catch (error) {
    console.error(error);
    throw error;
  }
}

module.exports = {
  handleEditionMint,
};
