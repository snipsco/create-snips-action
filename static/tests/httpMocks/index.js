module.exports = {
    mock(fetchMock) {
        // Chain mocks - see http://www.wheresrhys.co.uk/fetch-mock for API details
        fetchMock.mock('https://pokeapi.co/api/v2/pokemon/1/', {
            name: 'bulbasaur',
            weight: 69,
            height: 7
        })

        return fetchMock
    }
}