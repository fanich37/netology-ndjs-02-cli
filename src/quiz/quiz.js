const { MESSAGE_TYPES } = require('./constants');

module.exports = class Quiz {
  static parseNumber(line) {
    const number = parseInt(line);

    return Number.isInteger(number)
      ? number
      : null;
  }

  constructor(readlineInstance) {
    this.rl = readlineInstance;
    this.numberToGuess = null;
  }

  init() {
    this.rl.setPrompt('Please guess the max number: ');
    this.rl.prompt();

    this.rl
      .on('line', (line) => {
        const { message, text } = this.play(line);

        switch (message) {
          case MESSAGE_TYPES.stop:
            this.rl.setPrompt(text.concat('\n'));
            this.rl.prompt();
            this.rl.close();

          case MESSAGE_TYPES.error:
          case MESSAGE_TYPES.begin:
          case MESSAGE_TYPES.smaller:
          case MESSAGE_TYPES.greater:
          default:
            this.rl.setPrompt(text.concat('\n'));
        }

        this.rl.prompt();
      })
      .on('close', () => {
        process.exit(0);
      });
  }

  play(line) {
    const number = Quiz.parseNumber(line);

    if (number === null) {
      return {
        message: MESSAGE_TYPES.error,
        text: 'Seems like you entered not a number. Please try again.',
      };
    }

    if (this.numberToGuess === null) {
      this.numberToGuess = Math.round(Math.random() * number);

      return {
        message: MESSAGE_TYPES.begin,
        text: `The quiz is on! Try to guess the number between 0 and ${number}...`,
      };
    }

    if (number === this.numberToGuess) {
      return {
        message: MESSAGE_TYPES.stop,
        text: 'Hooray! You won!',
      };
    }

    if (number < this.numberToGuess) {
      return {
        message: MESSAGE_TYPES.smaller,
        text: 'The number is greater. Try again.',
      };
    }

    if (number > this.numberToGuess) {
      return {
        message: MESSAGE_TYPES.greater,
        text: 'The number is smaller. Try again.',
      };
    }
  }
}
