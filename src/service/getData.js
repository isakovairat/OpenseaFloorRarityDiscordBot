const {getStatsByCollectionSlug} = require("./getStatsByCollectionSlug");
const {getFloorItemsByCollectionSlug} = require("./getFloorItemsByCollectionSlug");
const {getAssetInfo} = require("./getAssetInfo");
// const {printResultsToConsole} = require("../utils/printResultsToConsole");

const getData = async (collectionSlug) => {
  const stats = await getStatsByCollectionSlug(collectionSlug);
  const { floorAssetRank, floorAssetTokenId, floorAssetPrice, assetContractAddress } = await getFloorItemsByCollectionSlug(collectionSlug);
  const assetInfo = await getAssetInfo(assetContractAddress, floorAssetTokenId);

  // printResultsToConsole(collectionSlug, stats.floor_price, results);

  return { stats, floorAssetRank, floorAssetTokenId, floorAssetPrice, assetContractAddress, assetInfo };
};

module.exports = {
  getData
}
