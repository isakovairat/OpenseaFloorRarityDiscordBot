const config = require("../utils/config.json");
const NUMBER_OF_STEPS = 1;

/**
 * Constants for Discord bot
 * */
const BOT_COMMAND = "opensea";
const BOT_PREFIX = '!';
const BOT_DEFAULT_COLLECTION_SLUG = 'boredapeyachtclub';

const OPTIONS = {
  method: 'GET',
  headers: {Accept: 'application/json', 'X-API-KEY': config.X_API_KEY}
};

module.exports = {
  NUMBER_OF_STEPS,
  BOT_COMMAND,
  BOT_PREFIX,
  BOT_DEFAULT_COLLECTION_SLUG,
  OPTIONS
}
