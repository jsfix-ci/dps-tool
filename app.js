#!/usr/bin/env node

const commander = require('commander')

commander
  .version('1.0.0')
  .description('installing packages and showing project info tool')

commander.parse(process.argv)