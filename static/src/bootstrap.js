const { configFactory, i18nFactory } = require('./factories')

const {
    LANGUAGE_MAPPINGS
} = require('./constants')

// Put anything that needs to be called on app. startup here.
module.exports = async () => {
    configFactory.init()
    const config = configFactory.get()
    const language = LANGUAGE_MAPPINGS[config.locale]
    await i18nFactory.init(language)
}