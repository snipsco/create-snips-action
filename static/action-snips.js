#!/usr/bin/env node
const debug = require('debug')
const { name } = require('./package.json')

// Enable error print
debug.enable(name + ':error')
// Uncomment this line to print everything
// debug.enable(name + ':*')

require('./src/index')()
