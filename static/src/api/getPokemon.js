const request = require('./request')

// Get a Pokemon by its id.
module.exports = function (id) {
    return request.url(`/pokemon/${id}/`).get().json()
}