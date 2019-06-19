# create-snips-action
### Generator for writing Snips action code in Javascript/Typescript.

![npm version](https://img.shields.io/npm/v/create-snips-action.svg)
![license](https://img.shields.io/npm/l/create-snips-action.svg)

--------


<p align="center">
<a href="https://asciinema.org/a/WkipaC14XsGtUaRamjbHuQCKx" target="_blank"><img src="https://asciinema.org/a/WkipaC14XsGtUaRamjbHuQCKx.svg" width="600"/></a>
<br/><br/>
<strong>Create a fully fledged Snips action in a single command.</strong>
</p>

## Prerequisites

[`node.js`](https://nodejs.org) must be installed with a version greater or equal than 8.

[Installing the snips platform](https://docs.snips.ai/getting-started) on the same machine is also recommended in order to have a fast development cycle.

## Usage

```bash
# Run this in your favourite terminal.
npm init snips-action
```

## Related packages and documentation

The bootstraped action have the following dependencies.
Please refer to their respective repositories for the full documentation.

- [snips-javascript-toolkit](https://github.com/snipsco/snips-javascript-toolkit)

*Used for building, testing, launching the action and contains a bunch of helpers.*

- [hermes-javascript](https://github.com/snipsco/hermes-protocol/tree/master/platforms/hermes-javascript)

*Used to communicate with the platform.*

## Features

**📦Uses the [javascript-toolkit](https://github.com/snipsco/snips-javascript-toolkit) package under the hood.**

- 🐚 Action code template (folder structure & files) fully commented
- ⚚ Platform interactions going through [hermes-javascript](https://www.npmjs.com/package/hermes-javascript)
- 💬 Internationalization (i18n) using [i18next](https://www.i18next.com)
- 📞 Api calls using [wretch](https://github.com/elbywan/wretch) and [wretch-middlewares](https://github.com/elbywan/wretch-middlewares)
- ✍️ Logger with [debug](https://github.com/visionmedia/debug)
- ✔️ Flows testing using [jest](https://jestjs.io/) and [mqtt](https://github.com/mqttjs).
- ✅ Linter with [eslint](https://eslint.org/)
