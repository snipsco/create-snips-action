const { Test } = require('snips-toolkit')

/* Utils */

function createPokemonIdSlot(id) {
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

/* Mock http calls */

SnipsToolkit.mock.http(fetchMock => {
    // Chain mocks - see http://www.wheresrhys.co.uk/fetch-mock for API details
    fetchMock.mock('https://pokeapi.co/api/v2/pokemon/1/', {
        name: 'bulbasaur',
        weight: 69,
        height: 7
    })
})

/* Tests */

it('should query a Pokemon by its id and output its name', async () => {
    const session = new Test.Session()
    await session.start({
        intentName: 'pokemon_details',
        input: 'Give me the details for Pokemon 1',
        slots: [
            createPokemonIdSlot('1')
        ]
    })
    // In test mode, the i18n output is mocked as a JSON containing the i18n key and associated options.
    // (basically the arguments passed to i18n, in serialized string form)
    const endSessionMessage = await session.end()
    const { key, options } = JSON.parse(endSessionMessage.text || '')
    expect(key).toBe('pokemon.info')
    expect(options.name).toBe('bulbasaur')
    expect(options.weight).toBe(69)
    expect(options.height).toBe(7)
})
