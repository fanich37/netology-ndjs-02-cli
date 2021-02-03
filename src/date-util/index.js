#!/usr/bin/env node

const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');

const {
  currentModule,
  addModule,
  subModule,
} = require('./commands');
const {
  YEAR_FLAGS,
  MONTH_FLAGS,
  DATE_FLAGS,
} = require('./constants');

const argv = hideBin(process.argv);

yargs(argv)
  .command(currentModule)
  .command(addModule)
  .command(subModule)
  .alias(...YEAR_FLAGS)
  .describe(YEAR_FLAGS[0], 'Get current year or make computation with current year')
  .alias(...MONTH_FLAGS)
  .describe(MONTH_FLAGS[0], 'Get current month or make computation with current month')
  .alias(...DATE_FLAGS)
  .describe(DATE_FLAGS[0], 'Get current day or make computation with current day')
  .help('h')
  .alias('help', 'h')
  .number([...YEAR_FLAGS, ...MONTH_FLAGS, ...DATE_FLAGS])
  .strict(true)
  .argv;
