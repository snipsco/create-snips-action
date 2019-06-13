import { pokemonRequest } from './index'

// Get a Pokemon by its id.
export function getPokemon (id) {
    return pokemonRequest
        .url(`/pokemon/${typeof id === 'string' ? id.toLowerCase() : id}/`)
        .get()
        .json()
}