// Импортируем всё необходимое.
// Или можно не импортировать,
// а передавать все нужные объекты прямо из run.js при инициализации new Game().

const Hero = require('./game-models/Hero');
const Enemy = require('./game-models/Enemy');
const Boomerang = require('./game-models/Boomerang');
const View = require('./View');
const runInteractiveConsole = require('./keyboard');

// Основной класс игры.
// Тут будут все настройки, проверки, запуск.

class Game {
  constructor({ trackLength }) {
    this.trackLength = trackLength;
    this.hero = new Hero({ position: 1, row: 1 }); // Герою можно аргументом передать бумеранг.
    this.boomerang = new Boomerang(this.hero);
    this.enemy = [];
    this.view = new View();
    this.regenerateTrack();
    this.score = 0;
    this.createEnemy();
    this.track = (new Array(5)).fill('').map(() => new Array(30).fill(' '));
  }

  createEnemy() {
    setInterval(() => {
      this.enemy.push(new Enemy());
    }, 1000);
  }

  regenerateTrack() {
    this.track = (new Array(5)).fill('').map(() => new Array(30).fill(' '));
    this.track[this.hero.row][this.hero.position] = this.hero.skin;
    if (this.boomerang.counter === 'right' || this.boomerang.counter === 'left') {
      this.track[this.boomerang.row][this.boomerang.position] = this.boomerang.skin;
    }
    if (this.boomerang.position - this.hero.position > 8) {
      this.boomerang.counter = 'left';
    }
    if (this.boomerang.position === this.hero.position && this.hero.row === this.boomerang.row) {
      this.boomerang.counter = 'behind';
    }
    this.enemy.forEach((el, index) => {
      el.moveLeft();
      this.track[el.row][el.position] = el.skin;
      // проверка позиция бумеранга и врага
      if (this.boomerang.row === el.row) {
        if (el.position === this.boomerang.position + 1
          || el.position === this.boomerang.position - 1
          || el.position === this.boomerang.position) {
          this.enemy.splice(1, index);
          this.score += 1;
          this.boomerang.counter = 'left';
        }
      }
      // проверка позиции героя и врага
      if (el.row === this.hero.row) {
        if (el.position === this.hero.position) {
          this.hero.die(this.score);
        }
      }
    });
    this.boomerang.fly();
  }

  play() {
    runInteractiveConsole(this.hero, this.boomerang);
    setInterval(() => {
      this.regenerateTrack();
      this.view.render(this.track, this.score);
    }, 100);
  }
}

module.exports = Game;
