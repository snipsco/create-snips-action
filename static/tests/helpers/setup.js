/* eslint no-console: off */

const { spawn } = require('child_process')
const mqtt = require('mqtt')
const { getFreePort } = require('./tools')
const fetchMock = require('fetch-mock')

module.exports = {
    bootstrap() {
        beforeAll(async () => {
            const mosquittoPort = await getFreePort()
            console.log('Launching mosquitto on port [' + mosquittoPort + ']')
            // To print full mosquitto logs, replace stdio: 'ignore' with stdio: 'inherit'
            const mosquitto = spawn('mosquitto', ['-p', mosquittoPort, '-v'], { stdio: 'ignore' })
            console.log('Mosquitto ready!')
            module.exports.mosquitto = mosquitto
            module.exports.mosquittoPort = mosquittoPort
            require('../../src/index')({
                hermesOptions: {
                    address: 'localhost:' + mosquittoPort,
                    logs: true
                },
                bootstrapOptions: {
                    i18n: {
                        mock: true
                    },
                    http: {
                        mock: require('../httpMocks').mock(fetchMock.sandbox())
                    },
                    config: {
                        mock: {
                            locale: 'english'
                        }
                    }
                }
            })
        })

        beforeEach(done => {
            const client = mqtt.connect(`mqtt://localhost:${module.exports.mosquittoPort}`)
            client.on('connect', function () {
                done()
            })
            client.on('error', function(err) {
                client.end({ force: true })
                throw new Error(err)
            })
            module.exports.mqttClient = client
        })

        afterEach(() => {
            module.exports.mqttClient.end({ force: true })
        })

        afterAll(done => {
            const { mosquitto } = module.exports
            setTimeout(() => {
                mosquitto.kill()
                console.log('Mosquitto killed.')
                done()
            }, 500)
        })
    }
}
