const {OPTIONS} = require("../utils/constants");
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

const getAssetInfo = async (assetContractAddress, assetTokenId) => {
  let res;

  try {
    const response = await fetch(`https://api.opensea.io/api/v1/asset/${assetContractAddress}/${assetTokenId}/`, OPTIONS);
    res = await response.json();
  } catch (err) {
    console.log(`Could not get asset info for asset/${assetContractAddress}/${assetTokenId}: ${err}`);
  }

  return res;
}

module.exports = {
  getAssetInfo,
}
