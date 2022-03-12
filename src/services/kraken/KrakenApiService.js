const { round } = require('mathjs');
const KrakenClient = require('kraken-api');

const kraken = new KrakenClient(process.env.KRAKEN_API_KEY, process.env.KRAKEN_SECRET_KEY);

console.log({ env: process.env });

const getBalances = async () => {

  const response = (await kraken.api('Balance')).result;

  // remove zero balances
  const balances = Object.fromEntries(Object.keys(response)
    .filter(key => response[key] > 0)
    .map(key => ([key, response[key]])));

  return balances;
};

const getAllAssetPairs = async () => {
  const response = await kraken.api('AssetPairs');
  return Object.keys(response.result);
};

const getAssetPairs = async (tickers) => {
  // get all asset pairs from kraken
  const allAssetPairs = await getAllAssetPairs();

  const assetPairs = allAssetPairs
    // take just pairs with EUR
    .filter(pair => pair.includes('EUR'))
    // remove all fiat-fiat pairs
    .filter(pair => {
      const [, fiat] = pair.split('EUR');
      return Boolean(!fiat);
    });

  const matchedAssetPairs = tickers
    .map(ticker => assetPairs.find(pair => {
      const [crypto] = pair.split('EUR');
      return crypto.includes(ticker);
    }))
    .filter(Boolean);

  return matchedAssetPairs;
};

const getTickerPrice = async (pair) => {

  const options = { pair };
  const response = await kraken.api('Ticker', options);

  return response.result;
};

const getPrices = async (tickers) => {

  const assetPairs = await getAssetPairs(tickers);

  const response = await Promise.all(assetPairs.map(pair => getTickerPrice(pair)));

  const prices = response
    .map(res => {
      const key = Object.keys(res)[0];
      const prices = {
        ask: res[key].a[0],
        bid: res[key].b[0],
      };
      return [key, prices.ask];
    });

  return Object.fromEntries(prices);
};

const getPortfolioValue = async () => {

  try {

    console.log('Getting balances');

    const balances = await getBalances();

    console.log('Got balances', balances);

    const tokens = Object.keys(balances);

    console.log('Getting prices');

    const prices = await getPrices(tokens);

    console.log('Got prices', prices);


    console.log('Getting portfolio');
    const portfolio = tokens
      .map(token => {

        const key = Object.keys(prices).find(key => key.includes(token));

        // price of token in main currency
        const price = parseFloat(prices[key]);

        const amount = round(balances[token], 4);

        const value = round(price * amount, 4);

        return { token, price, amount, value };
      })
      // filter out all tokens with 0 value in fiat currency
      .filter(token => token.value > 0);

    console.log('Got portfolio', portfolio);

    return portfolio;
  } catch (error) {
    console.error(JSON.stringify(error));
    throw error;
  }
};

module.exports = { getPortfolioValue };
