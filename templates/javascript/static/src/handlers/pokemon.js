import { i18n, message } from 'snips-toolkit'
import { getPokemon } from '../api'

export default async function (msg, flow) {
    // Suppose we have a pokemon id slot
    // If there are multiple, we take the only that is supposed to be the 'most valid'.
    // We discard slots with a confidence value too low.
    const pokemonSlot = message.getSlotsByName(msg, 'pokemon_id', { onlyMostConfident: true, threshold: 0.5 })

    // We need this slot, so if the slot had a low confidence or was not mark as required,
    // we throw an error.
    if(!pokemonSlot) {
        throw new Error('intentNotRecognized')
    }

    // Get the Pokemon data
    const pokemon = await getPokemon(pokemonSlot.value.value)

    // End the dialog session.
    flow.end()

    // Return the TTS speech.
    const pokemonName = pokemon.name
    return i18n.translate('pokemon.info', {
        name: pokemonName,
        weight: pokemon.weight,
        height: pokemon.height
    })
}