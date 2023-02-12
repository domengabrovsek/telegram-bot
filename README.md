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
