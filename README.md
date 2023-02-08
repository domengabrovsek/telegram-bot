# telegram-bot

## Description

Telegram bot deployed in CloudRun.

## Run it locally

```js

// on host
~ npm run start

// on host with reload
~ npm run watch

// as docker container 
~ docker-compose up
```

## Setup a webhook for the bot

```js
GET https://api.telegram.org/bot<api-key>/setWebhook?url=<endpoint>
```

## Environment variables

```js
API_KEY=<your_telegram_api_key>
TELEGRAM_USER_ID=<your_telegram_user_id>
BASE_URL=<telegram_api_base_url>
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