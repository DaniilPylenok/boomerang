// Сделаем отдельный класс для отображения игры в консоли.

class View {
  render(track, score) {
    const yourTeamName = 'MegaGurrenDan';

    // Тут всё рисуем.
    console.clear();
    console.log(track.map((element) => element.join('')).join('\n'));
    console.log('\n\n');
    console.log(`YOUR SCORE : ${score}`);
    console.log(`Created by "${yourTeamName}" with love`);
  }
}

module.exports = View;
