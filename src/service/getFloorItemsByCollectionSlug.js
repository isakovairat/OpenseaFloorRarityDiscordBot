const puppeteer = require("puppeteer");

const collect = ({ page, x }) => {
  return page.$x(x)
    .then(els => Promise.all(
      els.map(el => page.evaluate(el => el.textContent, el)),
    ));
};

const getFloorItemsByCollectionSlug = async (collection_slug) => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  await page.goto(`https://opensea.io/collection/${collection_slug}?search[sortAscending]=true&search[sortBy]=PRICE&search[toggles][0]=BUY_NOW`);

  const idsToPrices = {};
  let assetContractAddress;
  const [ids, prices] = await Promise.all([
    page.$x("//a[contains(@class, 'Asset--anchor')]")
      .then(els => Promise.all(els.map(el => page.evaluate(el => el.href, el))))
      .then(arr => arr.map((e) => {
        assetContractAddress = e.split('/')[4];

        return e.substring(e.lastIndexOf('/') + 1);
      })),
    collect({page, x: "//div[contains(@class, 'AssetCardFooter--price')]"})
      .then(arr => arr.filter((_, i) => i % 2 === 1)),
  ]);

  ids.forEach((el, i) => {
    idsToPrices[el] = prices[i];
  });

  const [floorAssetTokenId, floorAssetPrice ] = Object.entries(idsToPrices)[0];

  // TODO Rarity tools работают не для всех коллекций и не для айтемов с OpenSea, поэтому и падает приложение
  let floorAssetRank = '';
  await page.goto(`https://rarity.tools/${collection_slug}/view/${floorAssetTokenId}`);

  const x = "//span[contains(@class, 'font-bold whitespace-nowrap')]";
  await page.waitForXPath(x)
    .catch(async (err) => {
      console.log(`Could not get info about rank from rarity.tools: ${err}`);
      await browser.close();
      return { floorAssetRank, floorAssetTokenId, floorAssetPrice, assetContractAddress };
  });

  const [res] = await collect({page, x});

  if (res) {
    floorAssetRank = res.substring('Rarity Rank: '.length);
  }

  await browser.close();

  return { floorAssetRank, floorAssetTokenId, floorAssetPrice, assetContractAddress };
}

module.exports = {
  getFloorItemsByCollectionSlug
}
