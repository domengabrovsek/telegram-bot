# telegram-bot

Telegram bot

## Description

Playing around with telegram bot and nodejs

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

### Notes

Setup a webhook

```js
curl --request POST --url https://api.telegram.org/bot<API_KEY>/setWebhook --header 'content-type: application/json' --data '{"url": "<function url>"}'
```
