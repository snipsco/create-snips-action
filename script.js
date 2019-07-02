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
    const { name, description, author , language } = await inquirer.prompt([
        {
            name: 'name',
            message: 'What is the action name?',
            validate: value => value.trim() ? true : 'Please enter a non-empty name.',
            filter: value => value && ('snips-action-' + value),
            suffix: ' (snips-action-…)'
        },
       {
            name: 'language',
            type: 'list',
            message: 'Select the programming language of your choice.',
            choices: [
                'javascript',
                'typescript'
            ]
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
    const originDirectory = path.join(__dirname, 'templates', language)
    const commonDirectory = path.join(__dirname, 'common')

    console.log(c.bold(`Creating the action in ${targetDirectory}`))

    fs.mkdirSync(targetDirectory)

    // Copy static files
    fs.copySync(path.join(commonDirectory), targetDirectory)
    fs.copySync(path.join(originDirectory, 'static'), targetDirectory)

    // Copy dynamic files
    const dynamicFiles = klawSync(path.join(originDirectory, 'dynamic'), { nodir: true })
    dynamicFiles.forEach(file => {
        const relativePath = path.relative(path.join(originDirectory, 'dynamic'), file.path)
        const destinationPath = path.join(targetDirectory, relativePath)

        const output = Mustache.render(fs.readFileSync(file.path, 'utf-8'), {
            name,
            description,
            author
        })

        fs.outputFileSync(destinationPath, output)
    })

    console.log(c.bold.green(`Action ${name} created successfully.\n`))
    console.log(`Type ${c.bold(`"cd ${name}"`)} to go to the action root directory followed by ${c.bold('"sh setup.sh"')} to install the dependencies.`)
    console.log(c.bold('\nAvailable commands:'))
    console.log(`- ${c.bold('npm run dev   ')} Automatically rebuilds and run the action on file change.`)
    console.log(`- ${c.bold('npm run build ')} Builds the action in production mode.`)
    console.log(`- ${c.bold('npm run test  ')} Runs the test suite.`)
    console.log(`- ${c.bold('npm run launch')} Runs the action in production mode.`)
    console.log(`- ${c.bold('npm run lint  ')} Performs a linter check.`)
    console.log(`- ${c.bold('npm start     ')} Lints, builds and tests the action.`)
    console.log('')
}

try {
    main()
} catch (error) {
    console.error(c.bold.red('Action creation failed.'))
    throw error
}