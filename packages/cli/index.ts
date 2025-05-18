#!/usr/bin/env node
import cac from 'cac'

const cli = cac('@inkart/cli')
cli.command('[projectname]', 'create new template').action((...args) => {
    console.log(args)
})