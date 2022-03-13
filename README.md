# telegram-bot

Telegram bot

## Description

Telegram bot running as serverless AWS Lambda integrating various services.

## Commands

```js

// sync list of supported commands
/commands

// retrieves portfolios from binance and kraken crypto exchanges
/portfolio

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
