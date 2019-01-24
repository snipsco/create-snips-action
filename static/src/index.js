const { withHermes } = require('hermes-javascript')
const bootstrap = require('./bootstrap')
const handlers = require('./handlers')
const { translation, logger } = require('./utils')

// Initialize hermes
module.exports = function ({
    hermesOptions = {},
    mock = {
        i18n: false,
        http: false
    }
} = {}) {
    withHermes(async (hermes, done) => {
        try {
            // Bootstrap config, locale, i18n…
            await bootstrap(mock)

            const dialog = hermes.dialog()

            // This is a placeholder! Replace that by something valid!
            dialog.flow('pokemon', handlers.pokemon)

        } catch (error) {
            // Output initialization errors to stderr and exit
            const message = await translation.errorMessage(error)
            logger.error(message)
            logger.error(error)
            // Exit
            done()
        }
    }, hermesOptions)
}