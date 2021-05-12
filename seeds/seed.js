const sequelize = require("../config/connection");
// const { User, Post, Comment } = require("../models");
const comments = require("./commentSeeds");
const posts = require("./postSeeds");
const users = require("./userSeeds");

const seedDatabase = async () => {
  await sequelize.sync({ force: true });
  await posts();
  await comments();
  await users();

  process.exit(0);
};

seedDatabase();

 // const users = await User.bulkCreate(userSeeds, {
  //   individualHooks: true,
  //   returning: true,
  // });

  // const posts = await Post.bulkCreate(postSeeds, {
  //   individualHooks: true,
  //   returning: true,
  // });

  // const comments = await Comment.bulkCreate(commentSeeds, {
  //   individualHooks: true,
  //   returning: true,
  // });
