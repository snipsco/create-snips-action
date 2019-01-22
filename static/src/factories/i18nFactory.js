const fs = require('fs')
const path = require('path')
const i18next = require('i18next')
const { DEFAULT_LANGUAGE } = require('../constants')

let i18n = null

async function init(language = DEFAULT_LANGUAGE) {
    try {
        // Read the language files.
        const languageResources = fs.readFileSync(path.resolve(__dirname + `/../../assets/i18n/${language}.json`), 'utf-8')
        const resources = {
            [language]: {
                translation: JSON.parse(languageResources)
            }
        }
        // Init the i18next library.
        i18n = await i18next.init({
            lng: language,
            fallbackLng: DEFAULT_LANGUAGE,
            resources
        })
    } catch (error) {
        throw new Error('localisation')
    }
}

module.exports = {
    init,
    get: () => i18n
}