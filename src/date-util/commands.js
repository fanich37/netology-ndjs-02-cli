const add = require('date-fns/add');
const sub = require('date-fns/sub');
const formatISO = require('date-fns/formatISO');

const {
  getCurrentDate,
  getDateOperation,
  logError,
} = require('./utils');

module.exports.currentModule = {
  command: 'current',
  aliases: ['c'],
  desc: 'Get current date or year/month/day separately',
  handler: (argv) => {
    const currentDate = getCurrentDate(argv);

    console.log(currentDate);
  },
};

module.exports.addModule = {
  command: 'add',
  aliases: ['a'],
  desc: 'Add years/month/days to current date',
  handler: (argv) => {
    const operation = getDateOperation(argv);

    if (operation === null) {
      logError(
        `Parameter should be passed to 'add' function and it should be a number...`
      );
      process.exit(1);
    }

    const calculatedDate = add(new Date(), operation);

    console.log(formatISO(calculatedDate));
  },
};

module.exports.subModule = {
  command: 'sub',
  aliases: ['s'],
  desc: 'Subtract years/month/days from current date',
  handler: (argv) => {
    const operation = getDateOperation(argv);

    if (operation === null) {
      logError(
        `Parameter should be passed to 'sub' function and it should be a number...`
      );
      process.exit(1);
    }

    const calculatedDate = sub(new Date(), operation);

    console.log(calculatedDate);
  },
};
