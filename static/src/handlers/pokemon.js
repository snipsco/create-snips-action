const api = require('../api')
const { i18nFactory } = require('../factories')
const { message } = require('../utils')

module.exports = async function (msg, flow) {
    // Print the received intent message
    // eslint-disable-next-line
    console.log('Received:\n', JSON.stringify(msg))

    // Suppose we have a pokemon id slot
    // If there are multiple, we take the only that is supposed to be the 'most valid'.
    // We discard slots with a confidence value too low.
    const pokemonId = message.getSlotsByName(msg, 'pokemon_id', { onlyMostConfident: true, threshold: 0.5 })

    // We need this slot, so if the slot had a low confidence or was not mark as required,
    // we throw an error.
    if(!pokemonId) {
        throw new Error('intentNotRecognized')
    }

    // Get the Pokemon data
    const pokemon = await api.getPokemon(pokemonId.value.value)

    // End the dialog session.
    flow.end()

    // Return the TTS speech.
    const i18n = i18nFactory.get()
    const pokemonName = pokemon.forms[0].name
    return i18n({
        name: pokemonName,
        weight: pokemon.weight,
        height: pokemon.height
    })
}