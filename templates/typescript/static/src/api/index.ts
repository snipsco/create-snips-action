import { http } from 'snips-toolkit'

export const pokemonRequest = http('https://pokeapi.co/api/v2')
export * from './getPokemon'
