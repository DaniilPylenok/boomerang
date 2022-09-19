// Бумеранг является оружием.
// В дальнейшем можно добавить другое оружие.
// Тогда можно будет создать класс Weapon и воспользоваться наследованием!

class Boomerang {
  constructor(hero) {
    this.skin = '🌀';
    this.position = 0;
    this.row = 0;
    this.hero = hero;
    this.counter = 'behind';
    this.startposition = 0;
  }

  start(startValue) {
    this.startposition = startValue;
    this.position += 2;
    this.counter = 'right';
  }

  stop() {
    this.counter = 'behind';
  }

  fly() {
    if (this.counter === 'right') {
      this.moveRight();
    }
    if (this.counter === 'left') {
      this.moveLeft();
    }
    if (this.counter === 'behind') {
      this.position = this.hero.position - 1;
      this.row = this.hero.row;
    }
  }

  moveLeft() {
    if (this.position > 1 && this.position !== this.startposition) {
      this.position -= 1;
    }
  }

  moveRight() {
    if (this.position < 26) {
      this.position += 1;
    }
  }
}

module.exports = Boomerang;
