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
    if (this.position < 29) {
      this.position += 1;
    }
  }

  moveDown() {
    if (this.row <= 3) {
      this.row += 1;
    }
  }

  moveUp() {
    // Идём вверх.
    if (this.row > 0) {
      this.row -= 1;
    }
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
