module.exports = {
    createPokemonIdSlot(id) {
        return {
            slotName: 'pokemon_id',
            entity: 'pokemon_id',
            confidenceScore: 1,
            rawValue: id,
            value: {
                kind: 'Custom',
                value: id
            },
            range: {
                start: 0,
                end: 1
            }
        }
    }
}