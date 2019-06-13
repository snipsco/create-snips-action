import { handler } from 'snips-toolkit'
import pokemon from './pokemon'

// Add handlers here, and wrap them.
export default {
    pokemon: handler.wrap(pokemon)
}