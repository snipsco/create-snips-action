# {{ name }}
#### {{ description }}

## Setup

```sh
# Install the dependencies and creates the config.ini file.
sh setup.sh
```

## Run

```sh
node action-snips.js
```

## Debug

In the `action-snips.js` file:

```js
// Uncomment this line to print everything
// debug.enable(name + ':*')
```

When running from the terminal, to enable full depth object printing:

```bash
env DEBUG_DEPTH=null action-snips.js
```

## Test & Lint

*Requires [mosquitto](https://mosquitto.org/download/) to be installed.*

```sh
npm start
```

**In test mode, i18n output and http calls are mocked.**

- **http**: see `tests/httpMocks/index.js`
- **i18n**: see `src/factories/i18nFactory.js`