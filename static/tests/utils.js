module.exports = {
    createPokemonIdSlot(id) {
        return {
            slotName: 'pokemon_id',
            entity: 'pokemon_id',
            confidence: 1,
            rawValue: id,
            value: {
                kind: 'Custom',
                value: id
            }
        }
    }
}