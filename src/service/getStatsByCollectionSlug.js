const {OPTIONS} = require("../utils/constants");
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

const getStatsByCollectionSlug = async (collection_slug) => {
  let res;

  try {
    const response = await fetch(`https://api.opensea.io/api/v1/collection/${collection_slug}/stats`, OPTIONS);
    res = await response.json();
  } catch (err) {
    console.log(`Could not get stats for ${collection_slug}`);
  }

  return res.stats;
}

module.exports = {
  getStatsByCollectionSlug,
}
