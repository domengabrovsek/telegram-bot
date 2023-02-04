# telegram-bot

Telegram bot

## Description

Telegram bot deployed in CloudRun.

## Setup a webhook for the bot

```js
  https://api.telegram.org/bot<api-key>/setWebhook?url=<endpoint>
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