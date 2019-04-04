import { i18n, message, Handler } from 'snips-toolkit'
import { getPokemon } from '../api'
import { NluSlot, slotType } from 'hermes-javascript'

export const pokemonHandler: Handler = async function (msg, flow) {
    // Suppose we have a pokemon id slot
    // If there are multiple, we take the only that is supposed to be the 'most valid'.
    // We discard slots with a confidence value too low.
    const pokemonSlot: NluSlot<slotType.custom> | null =
        message.getSlotsByName(
            msg,
            'pokemon_id',
            {
                onlyMostConfident: true,
                threshold: 0.5
            }
        )

    // We need this slot, so if the slot had a low confidence or was not mark as required,
    // we throw an error.
    if(!pokemonSlot) {
        throw new Error('intentNotRecognized')
    }

    // Get the Pokemon data
    const pokemonId = pokemonSlot.value.value
    const pokemon = await getPokemon(pokemonId)

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
