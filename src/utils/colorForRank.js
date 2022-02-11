const chalk = require("chalk");

const colorForRank = (rank) => {
  const ranking = parseInt(rank.substring(1).trim());

  if (ranking < 2000) return chalk.green;
  if (ranking < 6000) return chalk.yellow;

  return chalk.white;
};

module.exports = {
  colorForRank
}
