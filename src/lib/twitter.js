const axios = require('axios');

const baseUrl = 'https://api.twitter.com';
const token = process.env.TWITTER_BEARER_TOKEN;
const options = {
  headers: {
    'Authorization': `Bearer ${token}`
  }
};

const getUserId = async (username) => {
  const url = `${baseUrl}/2/users/by/username/${username}`;
  const result = await axios.get(url, options);
  return result.data.data.id;
};

const getFollowers = async (userId) => {
  const url = `${baseUrl}/2/users/${userId}/following`;
  const result = await axios.get(url, options);
  return result.data.data;
};

const getTweetsByUser = async (userId) => {
  const url = `${baseUrl}/2/users/${userId}/tweets`;
  const result = await axios.get(url, options);
  return result.data.data;
};

const getDetailedTweets = async (ids) => {
  const url = `${baseUrl}/2/tweets?ids=${ids.join(',')}`;
  const result = await axios.get(url, options);
  return result.data.data;
};

const getTweetsByUsername = async (username) => {

  const userId = await getUserId(username);
  const tweets = await getTweetsByUser(userId);

  return tweets;
};

module.exports = {
  getFollowers,
  getTweetsByUser,
  getTweetsByUsername,
  getDetailedTweets
};
