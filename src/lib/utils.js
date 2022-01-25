const getRandomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

const formatArrayMessage = (array) => {

  let message = '';

  array.forEach(item => {
    message += ` ${item}\n`;
  });

  return message;
};

module.exports = { getRandomNumber, formatArrayMessage };
