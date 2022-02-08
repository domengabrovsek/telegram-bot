const { post } = require('./HttpService');

const getAccessToken = async () => {
  const authUrl = 'https://www.googleapis.com/oauth2/v4/token';
  const request = {
    'client_id': process.env.GMAIL_CLIENT_ID,
    'client_secret': process.env.GMAIL_CLIENT_SECRET,
    'refresh_token': process.env.GMAIL_REFRESH_TOKEN,
    'grant_type': 'refresh_token'
  };

  const result = await post(authUrl, request, {});

  return result.data.access_token;
};

module.exports = { getAccessToken };
// const options = {
//   headers: {
//     'Authorization': `Bearer ${token}`
//   }
// };

// (async () => {

//   // get user info
//   const { data: userInfo } = await axios.get(`${baseUrl}/users/${userId}/profile`, options);
//   console.log(userInfo);

//   // get unread messages
//   const { data: messageIds } = await axios.get(`${baseUrl}/users/${userId}/messages?q="is:unread`, options);

//   const unreadMessageIds = messageIds.messages.map(item => item.id);
//   console.log(unreadMessageIds, unreadMessageIds.length);

// })();
