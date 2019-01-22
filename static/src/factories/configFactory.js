const fs = require('fs')
const path = require('path')
const ini = require('ini')
const { camelizeKeys } = require('../utils/camelize')
const logger = require('../utils/logger')
const { SUPPORTED_LOCALES, DEFAULT_LOCALE } = require('../constants')

let config = null

function init () {
    try {
        // Get the config file.
        const configFilePath = path.resolve(__dirname + '/../../config.ini')
        const iniConfig = ini.parse(fs.readFileSync(configFilePath, 'utf8'))
        // Assume that the file keys are in snake case, and camelize them.
        for (let section in iniConfig) {
            config = {
                ...config,
                ...camelizeKeys(iniConfig[section])
            }
        }
        if(!config.locale) {
            config.locale = DEFAULT_LOCALE
        }
    } catch (error) {
        logger.error(error)
        throw new Error('config')
    }

    if (!(SUPPORTED_LOCALES.includes(config.locale))) {
        throw new Error('localisation')
    }
}

module.exports = {
    init,
    get: () => config
}