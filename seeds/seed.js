const sequelize = require("../config/connection");
const { User, Post, Comment } = require("../models");
const commentSeeds = require("./commentSeeds");
const postSeeds = require("./postSeeds");
const userSeeds = require('./userSeeds');


const seedDatabase = async () => {
  await sequelize.sync({ force: true });
  // await postSeeds();
  // await commentSeeds();
  // await userSeeds();
  const users = await User.bulkCreate(userSeeds, {
    individualHooks: true,
    returning: true,
  });

  const posts = await Post.bulkCreate(postSeeds, {
    individualHooks: true,
    returning: true,
  });

  const comments = await Comment.bulkCreate(commentSeeds, {
    individualHooks: true,
    returning: true,
  });
  process.exit(0);
};

seedDatabase();
