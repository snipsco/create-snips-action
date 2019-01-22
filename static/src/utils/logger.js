const debug = require('debug')
const { name } = require('../../package.json')
const infoLogger = debug(name + ':info')
const debugLogger = debug(name + ':debug')
const errorLogger = debug(name + ':error')

module.exports = {
    info: (...args) => infoLogger(...args),
    debug: (...args) => debugLogger(...args),
    error: (...args) => errorLogger(...args)
}