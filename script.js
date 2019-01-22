#!/usr/bin/env node

const path = require('path')
const fs = require('fs-extra')
const klawSync = require('klaw-sync')
const inquirer = require('inquirer')
const c = require('ansi-colors')
const Mustache = require('mustache')

async function main () {
    const currentDirectory = process.cwd()

    // console.log(c.bold('Creating a snips action!'))
    const { name, description, author } = await inquirer.prompt([
       {
            name: 'name',
            message: 'What is the action name?',
            validate: value => value.trim() ? true : 'Please enter a non-empty name.',
            filter: value => value && ('snips-action-' + value),
            suffix: ' (snips-action-…)'
       },
       {
           name: 'description',
           message: 'Please enter a description for your action. (optional)'
       },
       {
           name: 'author',
           message: 'Who is the author? (optional)'
       }
    ])

    const targetDirectory = path.join(currentDirectory, name)

    console.log(c.bold(`Creating the action in ${targetDirectory}`))

    fs.mkdirSync(targetDirectory)
    fs.copySync(path.join(__dirname, 'static'), targetDirectory)

    const dynamicFiles = klawSync(path.join(__dirname, 'dynamic'), { nodir: true })
    dynamicFiles.forEach(file => {
        const relativePath = path.relative(path.join(__dirname, 'dynamic'), file.path)
        const destinationPath = path.join(targetDirectory, relativePath)

        const output = Mustache.render(fs.readFileSync(file.path, 'utf-8'), {
            name,
            description,
            author
        })

        fs.outputFileSync(destinationPath, output)
    })

    console.log(c.bold.green('Done!'))
}

try {
    main()
} catch (error) {
    console.error(c.bold.red('Error!'))
    throw error
}