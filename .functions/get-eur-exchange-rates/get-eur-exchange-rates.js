const fetch = require('node-fetch');
const API_KEY = process.env.FIXER_API_KEY;

// Docs on event and context https://www.netlify.com/docs/functions/#the-handler-method
const handler = async (event) => {
  try {
    const symbols = event.queryStringParameters.symbols || 'USD'
    const response = await fetch(
      `http://data.fixer.io/api/latest?access_key=${API_KEY}&base=EUR&symbols=${symbols}&format=1`
    )
    const data = await response.json();

    return {
      statusCode: 200,
      body: JSON.stringify(data),
    }
  } catch (error) {
    return { statusCode: 500, body: error.toString() }
  }
}

module.exports = { handler }
