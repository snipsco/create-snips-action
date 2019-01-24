const { httpFactory } = require('../factories')

// Get a Pokemon by its id.
module.exports = function (id) {
    const http = httpFactory.get()
    return http.url(`/pokemon/${id}/`).get().json()
}