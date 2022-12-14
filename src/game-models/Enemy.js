// Враг.

class Enemy {
  constructor() {
    this.generateSkin();
    this.position = 29;
    this.randomInteger();
  }

  randomInteger() {
    // случайное число от min до (max+1)
    const rand = 0 + Math.random() * (6 - 1);
    this.row = Math.floor(rand);
  }

  generateSkin() {
    const skins = ['👾', '💀', '👹', '👻', '👽', '👿', '💩', '🤡', '🤺', '🧛', '🧟', '🎃'];
    this.skin = skins[Math.floor(Math.random() * skins.length)];
  }

  moveLeft() {
    // Идём влево.
    this.position -= 1;
  }

  die() {
    this.position = '?';
    console.log('Enemy is dead!');
  }
}

module.exports = Enemy;
