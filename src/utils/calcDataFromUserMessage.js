const {BOT_PREFIX, BOT_DEFAULT_COLLECTION_SLUG} = require('./constants');

const calcDataFromUserMessage = (content) => {
  const commandBody = content.slice(BOT_PREFIX.length);
  const args = commandBody.split(' ');
  const command = args.shift().toLowerCase();
  const collectionSlug = args.length > 0 ? args.shift().toLowerCase() : BOT_DEFAULT_COLLECTION_SLUG;

  return { command, collectionSlug }
}

module.exports = {
  calcDataFromUserMessage
}
