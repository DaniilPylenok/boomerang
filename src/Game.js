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
    }, 1400);
  }

  regenerateTrack() {
    this.enemy.forEach((el, index) => {
      el.moveLeft();

      // очистка незадействованных полей
      this.track[el.row][el.position + 1] = ' ';
      this.track[this.hero.row][this.hero.position + 1] = ' ';
      this.track[this.hero.row][this.hero.position - 1] = ' ';
      this.track[this.boomerang.row][this.boomerang.position + 1] = ' ';
      this.track[this.boomerang.row][this.boomerang.position - 1] = ' ';
      if (this.hero.row > 0) {
        this.track[this.hero.row - 1][this.hero.position] = ' ';
      }
      if (this.hero.row < 4) {
        this.track[this.hero.row + 1][this.hero.position] = ' ';
      }
      this.track[el.row][el.position] = el.skin;
      this.track[this.hero.row][this.hero.position] = this.hero.skin;
      if (this.boomerang.counter === 'right' || this.boomerang.counter === 'left') {
        this.track[this.boomerang.row][this.boomerang.position] = this.boomerang.skin;
      }
      // проверка позиция бумеранга и врага
      if (this.boomerang.row === el.row) {
        if (el.position === this.boomerang.position + 1
          || el.position === this.boomerang.position - 1
          || el.position === this.boomerang.position) {
          this.track[el.row][el.position] = ' ';
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
      // возвращение бумеранга
      if (this.boomerang.position - this.hero.position > 8) {
        this.boomerang.counter = 'left';
      }

      // бумеранг за спиной
      if (this.boomerang.position === this.hero.position && this.hero.row === this.boomerang.row) {
        this.boomerang.counter = 'behind';
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
