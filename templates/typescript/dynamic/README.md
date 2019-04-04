# {{ name }}
#### {{ description }}

## Setup

```sh
# Install the dependencies, builds the action and creates the config.ini file.
sh setup.sh
```

## API Documentation

Check the [javascript-toolkit](https://github.com/snipsco/snips-javascript-toolkit) package that this code uses under the hood.

## Run

- Dev mode:

```sh
# Dev mode watches for file changes and restarts the action.
npm run dev
```

- Prod mode:

```sh
# 1) Lint, transpile and test.
npm start
# 2) Run the action.
npm run launch
```

## Debug

In the `src/index.ts` file:

```js
// Replace 'error' with '*' to log everything
logger.enable('error')
```

## Test

*Requires [mosquitto](https://mosquitto.org/download/) to be installed.*

```sh
npm run test
```

**In test mode, i18n output and http calls are mocked.**
