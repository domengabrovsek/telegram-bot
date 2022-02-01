const axios = require('axios');

const baseUrl = 'https://finnhub.io/api/v1';
const token = process.env.FINNHUB_TOKEN;
const options = {
  headers: {
    'X-Finnhub-Token': token
  }
};

const getSymbolName = async (symbol) => {

  const url = `${baseUrl}/search?q=${symbol}`;
  const result = (await axios.get(url, options)).data;

  const symbolObj = result.result.find(obj => obj.symbol === symbol);
  const symbolName = symbolObj.description;

  return symbolName;
};

const getSymbolInfo = async (symbol) => {
  const url = `${baseUrl}//quote?symbol=${symbol}`;
  const result = (await axios.get(url, options)).data;

  const symbolName = await getSymbolName(symbol);

  const symbolInfo = {
    name: symbolName,
    current: result.c,
    high: result.h,
    low: result.l,
    open: result.o,
    change: result.d,
    percentChange: result.dp,
    previousClose: result.pc
  };

  return symbolInfo;
};

module.exports = {
  getSymbolInfo
};
