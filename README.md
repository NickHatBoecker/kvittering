# kvittering

Seamlessly convert your documents and invoices into digital format and access them from anywhere.

This app was developed for the Appwrite Hackathon 2023.

## Stack

- VueJS v2
- appwrite

## Demo

Open [Demo](https://kvittering.nickhatboecker.de).

## Project setup
```
yarn
cp .env .env.local
```

Put your appwrite project id via `VUE_APP_APPWRITE_PROJECT_ID` in `.env.local`.

### Development
```
yarn dev           # Compiles and hot-reloads for development
yarn build         # Compiles and minifies for production
yarn lint --fix    # Lints and fixes files
```

## Roadmap

- fix "open file" for safari => https://github.com/appwrite/appwrite/issues/5600
- add autocomplete for tags
