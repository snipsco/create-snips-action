import { Hermes, Done } from 'hermes-javascript'
import { config, i18n, logger } from 'snips-toolkit'
import handlers from './handlers'

// Enables deep printing of objects.
process.env.DEBUG_DEPTH = undefined
// Replace ':error' with ':*' to log everything
logger.enable('error')

export default async function ({
    hermes,
    done
}: {
    hermes: Hermes,
    done: Done
}) {
    try {
        // Initialize config and i18n.
        config.init()
        await i18n.init(config.get().locale)

        // Get the dialog subset.
        const dialog = hermes.dialog()

        // This is a placeholder! Replace that with your intent handler(s)!
        dialog.flow('pokemon_details', handlers.pokemon)
    } catch (error) {
        // Output initialization errors to stderr and exit
        const message = await i18n.errorMessage(error)
        logger.error(message)
        logger.error(error)
        // Exit
        done()
    }
}