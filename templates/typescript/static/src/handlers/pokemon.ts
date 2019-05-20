import { i18n, message, Handler } from 'snips-toolkit'
import { getPokemon } from '../api'
import { NluSlot, slotType } from 'hermes-javascript/types'

export const pokemonHandler: Handler = async function (msg, flow) {
    // Extract the name or id of the pokemon from the "pokemon_id" slot.
    // - If the confidence level is below 50%, we discard the slot. (threshold: 0.5)
    // - If multiple pokemon names/ids were found by the NLU,
    //   we pick only the one with the best confidence. (onlyMostConfident: true)
    const pokemonSlot: NluSlot<slotType.custom> | null =
        message.getSlotsByName(
            msg,
            'pokemon_id',
            {
                onlyMostConfident: true,
                threshold: 0.5
            }
        )

    // If the slot was not found or was discarded, we throw.
    if(!pokemonSlot) {
        throw new Error('intentNotRecognized')
    }

    // Make an API call to retrieve the pokemon details.
    const pokemonId = pokemonSlot.value.value
    const pokemon = await getPokemon(pokemonId)

    // Mark the session as ended.
    flow.end()

    // Speak!
    const pokemonName = pokemon.name
    return i18n.translate('pokemon.info', {
        name: pokemonName,
        weight: pokemon.weight,
        height: pokemon.height
    })
}
