const { default: wretch } = require('wretch')
const { dedupe } = require('wretch-middlewares')

const BASE_URL = 'https://pokeapi.co/api/v2'

// Setup wretch (https://github.com/elbywan/wretch)
module.exports = (
    wretch(BASE_URL)
        .polyfills({
            fetch: require('node-fetch')
        })
        // Add a dedupe middleware, throttling cache would also be useful to prevent excessive token usage.
        // (https://github.com/elbywan/wretch-middlewares)
        .middlewares([
            dedupe()
        ])
)