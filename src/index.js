#!/usr/bin/env node

const Discord = require("discord.js");
const config = require("./utils/config.json");
const {BOT_COMMAND, BOT_PREFIX} = require("./utils/constants");
const {calcDataFromUserMessage} = require("./utils/calcDataFromUserMessage");
const {getData} = require("./service/getData");

const client = new Discord.Client({intents: ["GUILDS", "GUILD_MESSAGES"]});

client.on("messageCreate", function(message) {
  if (message.author.bot) return;
  if (!message.content.startsWith(BOT_PREFIX)) return;

  const { command, collectionSlug } = calcDataFromUserMessage(message.content);

  if (command === BOT_COMMAND) {
    getData(collectionSlug)
      .then(({ stats, floorAssetRank, floorAssetTokenId, floorAssetPrice, assetContractAddress, assetInfo }) => {
        const fields = [
          {
            name: `Floor price: ${floorAssetPrice}`,
            value: "\u200B",
          },
          {
            name: `Rank by rarity.tools: ${floorAssetRank}`,
            value: "\u200B",
          },
          {
            name: `Pieces: ${stats.total_supply}`,
            value: "\u200B",
          },
          {
            name: `Owner: ${assetInfo.owner.user.username}`,
            value: "\u200B",
          }
        ];
        const url = `https://opensea.io/assets/${assetContractAddress}/${floorAssetTokenId}`;

        const embedData = new Discord.MessageEmbed()
          .setTitle(`${collectionSlug} #${floorAssetTokenId}`)
          .setFields(fields)
          .setImage(assetInfo.image_preview_url)
          .setURL(url);

        message.reply({ embeds: [embedData]});
      })
      .catch(err => {
        console.log(`getData error: ${err}`);
        message.reply('Сорри, обратитесь к админу');
      });
  }
});

client.login(config.BOT_TOKEN);
