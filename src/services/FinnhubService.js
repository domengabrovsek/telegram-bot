const { sendMessage } = require('../lib/telegram');
const { search, quote } = require('./FinnhubApiService');

const getSymbolName = async (symbol) => {

  const result = await search(symbol);

  const symbolObj = result.find(obj => obj.symbol === symbol);
  const symbolName = symbolObj.description;

  return symbolName;
};

const getSymbolInfo = async (symbol) => {

  // TODO: refactor this to be called in paralel
  const result = await quote(symbol);
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

const handleStockMessage = async (chatId, arg) => {
  const stockInfo = await getSymbolInfo(arg.toUpperCase());

  let message = 'Here is the stock info:\n\n';
  message += `Name: ${stockInfo.name}\n`;
  message += `Current price: ${stockInfo.current}$\n`;
  message += `Today's opening price: ${stockInfo.open}$\n`;
  message += `Today's range: ${stockInfo.low}-${stockInfo.high}$\n`;
  message += `Change from yesterday: ${stockInfo.change}$ (${stockInfo.percentChange}%)\n`;

  await sendMessage(chatId, message);
};

module.exports = {
  handleStockMessage
};
