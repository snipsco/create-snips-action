# {{ name }}
#### {{ description }}

## Setup

```
npm install
```

## Run

```
node action.js
```

## Debug

In the `action.js` file:

```js
// Uncomment this line to print everything
// debug.enable(name + ':*')
```

When running from the terminal, to enable full depth object printing:

```bash
env DEBUG_DEPTH=null action.js
```

## Test

*Requires [mosquitto](https://mosquitto.org/download/) to be installed.*

`npm test`