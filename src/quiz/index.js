#!/usr/bin/env node

const readline = require('readline');
const Quiz = require('./quiz');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

new Quiz(rl).init();
