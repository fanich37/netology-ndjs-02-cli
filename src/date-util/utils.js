const formatISO = require('date-fns/formatISO');
const getYear = require('date-fns/getYear');
const getMonth = require('date-fns/getMonth');
const getDate = require('date-fns/getDate');

const {
  YEAR_FLAGS,
  MONTH_FLAGS,
  DATE_FLAGS,
} = require('./constants');

module.exports.getCurrentDate = (argv) => {
  const date = new Date();

  if (YEAR_FLAGS.some(flag => flag in argv)) {
    return getYear(date);
  }

  if (MONTH_FLAGS.some(flag => flag in argv)) {
    return getMonth(date);
  }

  if (DATE_FLAGS.some(flag => flag in argv)) {
    return getDate(date);
  }

  return formatISO(date);
}

module.exports.getDateOperation = (argv) => {
  const operation = {};

  const [yearFlag] = YEAR_FLAGS;
  if (argv[yearFlag]) {
    Object.assign(operation, { years: argv[yearFlag] });
  }

  const [monthFlag] = MONTH_FLAGS;
  if (argv[monthFlag]) {
    Object.assign(operation, { 'months': argv[monthFlag] });
  }

  const [dateFlag] = DATE_FLAGS;
  if (argv[dateFlag]) {
    Object.assign(operation, { 'days': argv[dateFlag] });
  }

  return Object.entries(operation).length === 0
    ? null
    : operation;
};

module.exports.logError = (errorMessage) => {
  console.log(`\x1b[31m${errorMessage}`);
}
