import { handler } from 'snips-toolkit'
import { pokemonHandler } from './pokemon'

// Add handlers here, and wrap them.
export default {
    pokemon: handler.wrap(pokemonHandler)
}