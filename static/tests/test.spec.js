require('./helpers/setup').bootstrap()
const Session = require('./helpers/session')
const { createPokemonIdSlot } = require('./utils')

it('should query a Pokemon by its id and output its name', async () => {
    const session = new Session()
    await session.start({
        intentName: 'pokemon',
        input: 'Give me the details for Pokemon 1',
        slots: [
            createPokemonIdSlot('1')
        ]
    })
    const message = await session.end()
    expect(message.text.indexOf('bulbasaur')).toBeGreaterThan(-1)
})