const getRandomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

const queryStringify = (obj) => {
  const key = Object.keys(obj)[0];
  const value = obj[key];
  return `${key}=${value}`;
};

module.exports = { getRandomNumber, queryStringify };
