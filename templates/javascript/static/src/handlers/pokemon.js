import { i18n, message } from 'snips-toolkit'
import { getPokemon } from '../api'

export default async function (msg, flow) {
    // Extract the name or id of the pokemon from the "pokemon_id" slot.
    // - If the confidence level is below 50%, we discard the slot. (threshold: 0.5)
    // - If multiple pokemon names/ids were found by the NLU,
    //   we pick only the one with the best confidence. (onlyMostConfident: true)
    const pokemonSlot = message.getSlotsByName(msg, 'pokemon_id', { onlyMostConfident: true, threshold: 0.5 })

    // If the slot was not found or was discarded, we throw.
    if(!pokemonSlot) {
        throw new Error('intentNotRecognized')
    }

    // Make an API call to retrieve the pokemon details.
    const pokemon = await getPokemon(pokemonSlot.value.value)
    const pokemonName = pokemon.name

    // Mark the session as ended.
    flow.end()

    // Speak!
    return i18n.translate('pokemon.info', {
        name: pokemonName,
        weight: pokemon.weight,
        height: pokemon.height
    })
}