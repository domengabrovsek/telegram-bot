require('dotenv').config();
const crypto = require('crypto');
const axios = require('axios');

const { queryStringify } = require('../../lib/utils');
const { BINANCE_URL, BINANCE_API_KEY, BINANCE_SECRET_KEY, CURRENCY } = process.env;

const createSignature = (params) => {

  const query = queryStringify(params);

  const signature = crypto
    .createHmac('sha256', BINANCE_SECRET_KEY)
    .update(query)
    .digest('hex');

  return signature;
};

const getMethodType = (endpoint) => {
  // supported methods by Binance API
  const supportedMethods = {
    public: ['ticker/price'],
    private: ['account'],
  };

  // find out if provided endpoint is public or private
  const type = Object.keys(supportedMethods)
    .filter(key => supportedMethods[key]
      .find(method => method === endpoint)).join('');

  return type;
};

const callApi = async (endpoint, params) => {
  try {
    // construct full url from base url and endpoint
    const url = `${BINANCE_URL}/${endpoint}`;

    // determine method type [private|public]
    const methodType = getMethodType(endpoint);

    // default http options
    const options = { params };

    // for private endpoints we need to generate a signature using secret
    if (methodType === 'private') {
      const timestamp = new Date().getTime();

      // generate signature for the request
      const signature = createSignature({ ...params, timestamp });

      options.headers = { 'X-MBX-APIKEY': BINANCE_API_KEY };
      options.params = { ...params, timestamp, signature };
    }

    // call api
    const response = await axios.get(url, options);

    return response.data;
  } catch (error) {
    console.error(error.response.data);
  }
};

const getBalances = async () => {
  const response = await callApi('account');
  const nonZeroBalances = response.balances
    .filter(b => parseFloat(b.free) > 0);

  return Object.fromEntries(nonZeroBalances.map(b => [b.asset, b.free]));
};

const getPrice = (symbol) => {
  const endpoint = 'ticker/price';
  const params = { symbol };
  return callApi(endpoint, params);
};

const getPrices = async (symbols = []) => {
  const response = await Promise.all(symbols.map(s => getPrice(`${s}${CURRENCY}`)));
  const result = Object.fromEntries(response.map(r => [r.symbol, r.price]));
  return result;
};

module.exports = { getPrices, getBalances };
