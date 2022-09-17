const { sequelize, User } = require('./db/models');

async function createUser(name, scor) {
  try {
    const user = await User.findOne({
      where: {
        username: name,
      },
    });
    if (user.score < scor) {
      user.score = scor;
      await user.save();
    }
  } catch (err) {
    try {
      await User.create({
        username: name,
        score: scor,
      });
    } catch {
      console.log(err.message);
    }
  }
}

module.exports = createUser;
