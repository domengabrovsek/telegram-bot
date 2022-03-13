const crypto = require('crypto');
const qs = require('qs');
const axios = require('axios');

const { KRAKEN_URL, KRAKEN_API_KEY, KRAKEN_SECRET_KEY } = process.env;

// https://docs.kraken.com/rest/#section/Authentication/Headers-and-Signature
const getMessageSignature = (path, request) => {
  const message = qs.stringify(request);
  const secret_buffer = Buffer.from(KRAKEN_SECRET_KEY, 'base64');
  const hash = new crypto.createHash('sha256');
  const hmac = new crypto.createHmac('sha512', secret_buffer);
  const hash_digest = hash.update(request.nonce + message).digest('binary');
  const hmac_digest = hmac.update(path + hash_digest, 'binary').digest('base64');

  return hmac_digest;
};

const getMethodType = (endpoint) => {

  // supported method by Kraken API
  const supportedMethods = {
    public: ['AssetPairs', 'Ticker'],
    private: ['Balance'],
  };

  // find out if provided endpoint is public or private
  const type = Object.keys(supportedMethods)
    .filter(key => supportedMethods[key]
      .find(method => method === endpoint)).join('');

  return type;
};

const callApi = async (endpoint, params = {}) => {

  // endpoint type (private|public)
  const type = getMethodType(endpoint);

  // endpoint path
  const path = `/0/${type}/${endpoint}`;

  // full endpoint url
  const url = `${KRAKEN_URL}${path}`;

  // for private endpoints nonce is required for auth
  if (type === 'private') {
    params.nonce = new Date() * 1000;
  }

  // data to be send
  const data = qs.stringify(params);

  // generate signature
  const signature = getMessageSignature(path, params);

  const headers = {
    'API-Key': KRAKEN_API_KEY,
    'API-Sign': signature
  };

  const options = { headers };

  // post is used for private endpoints
  const post = (url) => axios.post(url, data, options);

  // get is used for public endpoints
  const get = (url, params = {}) => axios.get(url, { params });

  const response = type === 'private'
    ? await post(url)
    : await get(url, params);

  return response?.data?.result;
};

const getBalances = () => callApi('Balance');
const getAssetPairs = () => callApi('AssetPairs');
const getTicker = (options) => callApi('Ticker', options);

module.exports = { getBalances, getAssetPairs, getTicker };
