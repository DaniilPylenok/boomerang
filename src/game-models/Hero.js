const readlineSync = require('readline-sync');
const createUser = require('../../selectdb');

class Hero {
  constructor({ position, row }) {
    this.skin = '🤠'; // можете использовать любые emoji '💃'
    this.position = position;
    this.row = row;
  }

  moveLeft() {
    if (this.position > 1) {
      this.position -= 1;
    }
  }

  moveRight() {
    if (this.position < 30) {
      this.position += 1;
    }
  }

  moveDown() {
    // Идём вниз.
    this.row += 1;
  }

  moveUp() {
    // Идём вверх.
    this.row -= 1;
  }

  async die(score) {
    console.log(`YOU ARE DEAD!💀, YOUR SCORE: ${score}`);
    this.skin = '💀';
    const name = readlineSync.question('Ваш ник :');
    await createUser(name, score);
    process.exit();
  }
}

module.exports = Hero;
