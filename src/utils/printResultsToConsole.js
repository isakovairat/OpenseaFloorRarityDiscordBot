const chalk = require("chalk");
const {printTable} = require("console-table-printer");
const {colorForRank} = require("../utils/colorForRank");

const printResultsToConsole = (collection_slug, floorPrice, results) => {
  // console.clear();
  console.log();
  console.log();
  console.log(`🛳️  OpenSea floor rarity for ${chalk.green(chalk.bold(collection_slug))}:`);
  console.log();
  console.log();

  printTable([{'Floor Price' : chalk.bold`${floorPrice}`}]);

  printTable(
    results.map(([id, price, rank]) => ({
      'Token ID': chalk.bold`#${id}`,
      'Price': `${price.trim()}Ξ`,
      'Ranking on rarity.tools': colorForRank(rank)(rank),
    })),
  );

  console.log();
  console.log();
}

module.exports = {
  printResultsToConsole
}
