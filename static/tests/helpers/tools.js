const { createServer } = require('net')
const camelcase = require('camelcase')

module.exports = {
    camelize(item) {
        if(typeof item !== 'object' || !item)
            return item
        if(item instanceof Array) {
            return item.map(value => module.exports.camelize(value))
        }
        Object.entries(item).forEach(([ key, value ]) => {
            const camelizedKey = camelcase(key)
            const isSameKey = key === camelizedKey
            item[camelizedKey] = module.exports.camelize(value)
            if(!isSameKey) {
                delete item[key]
            }
        })
        return item
    },
    getFreePort () {
        return new Promise((resolve, reject) => {
            const server = createServer()
            server.on('error', err => {
                reject(err)
            })
            server.on('listening', () => {
                const port = server.address().port
                server.close()
                resolve(port)
            })
            server.listen()
        })
    },
    getMessageKey(message) {
        return JSON.parse(message.text).key
    }
}