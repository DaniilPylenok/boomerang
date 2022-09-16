// Умеешь работать с keypress? Попробуй разобраться в этом файле.
// Вместо keypress можно использовать и стандартный readline.
// Главное не используй всё вместе!

const keypress = require('keypress');
// const Hero = require('./game-models/Hero');

function runInteractiveConsole(hero, boomerang) {
  const keyboard = {
    d: () => hero.moveRight(),
    a: () => hero.moveLeft(),
    w: () => hero.moveUp(),
    s: () => hero.moveDown(),
    space: () => boomerang.start(hero.position),
    n: () => boomerang.stop(),
  };
  keypress(process.stdin);
  process.stdin.on('keypress', (ch, key) => {
    if (key) {
      // Вызывает команду, соответствующую нажатой кнопке.
      if (key.name in keyboard) {
        keyboard[key.name]();
      }
      // Прерывание программы.
      if (key.ctrl && key.name === 'c') {
        process.exit();
      }
    }
  });
  process.stdin.setRawMode(true);
}

// Давай попробуем запустить этот скрипт!

// runInteractiveConsole();

module.exports = runInteractiveConsole;
