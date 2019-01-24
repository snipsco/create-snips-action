const { default: wretch } = require('wretch')
const { dedupe } = require('wretch-middlewares')

const BASE_URL = 'https://pokeapi.co/api/v2'

const http = wretch(BASE_URL)
    // Add a dedupe middleware, throttling cache would also be useful to prevent excessive token usage.
    // (https://github.com/elbywan/wretch-middlewares)
    .middlewares([
        dedupe()
    ])

module.exports = {
    init(httpOptions = {}) {
        wretch().polyfills({
            fetch: httpOptions.mock || require('node-fetch')
        })
    },
    get() { return http }
}