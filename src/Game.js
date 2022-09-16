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
    this.hero = new Hero({ position: 0, row: 0 }); // Герою можно аргументом передать бумеранг.
    this.boomerang = new Boomerang(this.hero);
    this.enemy = new Enemy();
    this.view = new View();
    this.regenerateTrack();
    this.score = 0;
  }

  regenerateTrack() {
    // Сборка всего необходимого (герой, враг(и), оружие)
    // в единую структуру данных
    this.track = (new Array(5)).fill('').map(() => new Array(30).fill(' '));

    if (this.boomerang.counter === 'right' || this.boomerang.counter === 'left') {
      this.track[this.boomerang.row][this.boomerang.position] = this.boomerang.skin;
    }
    this.track[this.hero.row][this.hero.position] = this.hero.skin;
    this.track[this.enemy.row][this.enemy.position] = this.enemy.skin;
    this.enemy.moveLeft();
    this.boomerang.fly();
  }

  check() {
    // условие смерти героя
    if (this.hero.position === this.enemy.position && this.hero.row === this.enemy.row) {
      this.hero.die(this.score);
    }
    // ниже чтобы не заходил за края
    if (this.hero.position < 0) {
      this.hero.position = 0;
    }
    if (this.hero.row < 0) {
      this.hero.row = 0;
    }
    if (this.hero.row > 3) {
      this.hero.row = 3;
    }
    // ниже условия для убийства бумерангом
    if ((this.boomerang.position === this.enemy.position
      || this.boomerang.position + 1 === this.enemy.position)
      && this.boomerang.row === this.enemy.row
    ) {
      this.score += 1;
      this.enemy.die();
      this.boomerang.counter = 'left';
      this.enemy = new Enemy();
    }
    if (this.enemy.position < 1) {
      this.enemy = new Enemy();
    }

    if (this.boomerang.position - this.hero.position > 8) {
      this.boomerang.counter = 'left';
    }
    // нужно чтобы он и влево летатал и возвращался вправо
    // if (this.hero.position - this.boomerang.position < 8) {
    //   this.boomerang.counter = 'right';
    // }

    if (this.boomerang.position === this.hero.position && this.hero.row === this.boomerang.row) {
      this.boomerang.counter = 'behind';
    }
  }

  play() {
    runInteractiveConsole(this.hero, this.boomerang);
    setInterval(() => {
      // Let's play!
      this.check();
      this.regenerateTrack();
      this.check();
      this.view.render(this.track, this.score);
    }, 100);
  }
}

module.exports = Game;
