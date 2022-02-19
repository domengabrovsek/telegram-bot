# telegram-bot

Telegram bot

## Description

Playing around with telegram bot and nodejs and integrating different services into telegram bot.

## Commands

```js

// get a list of all currently supported commands
/commands

// get recent tweets for specified username
/twitter [username]

// get current crypto token prices for specified ticker
/tokens [ticker]

// get current stock prices for specified symbol
/stocks [symbol]

```

## Setup a webhook for the bot

```js
curl 
  --request POST 
  --url https://api.telegram.org/bot<API_KEY>/setWebhook 
  --header 'content-type: application/json' 
  --data '{"url": "<ENDPOINT>"}'
```

## Example request structure of message

```json
{
  "update_id": 1,
  "message": {
    "message_id": 1,
    "from": {
      "id": 1,
      "is_bot": false,
      "first_name": "name",
      "last_name": "surname",
      "username": "username",
      "language_code": "en"
    },
    "chat": {
      "id": 1,
      "first_name": "name",
      "last_name": "surname",
      "username": "username",
      "type": "private"
    },
    "date": 1,
    "text": "sent text",
    "entities": [
      {
        "offset": 0,
        "length": 9,
        "type": "bot_command"
      }
    ]
  }
}
```
