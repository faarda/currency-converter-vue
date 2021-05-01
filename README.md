# currency-converter-vue

Live project is here https://currency-converter-with-vue.netlify.app

To successfully deploy to netlify, I had to create a netlify serverless function at .functions/get-eur-exchange-rates/get-eur-exchange-rates.js that makes the actual API call to fixer.io's servers, the reason for this is because fixer.io only provides http access for free accounts and calling the API's directly from the client-side on an https server would lead to a mixed-content error.

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### Lints and fixes files
```
yarn lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
