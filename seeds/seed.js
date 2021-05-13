const sequelize = require("../config/connection");
const { User, Post, Comment } = require("../models");
const comments = require("./commentSeeds");
const posts = require("./postSeeds");
const users= require("./userSeeds");

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const postSeeds = await Post.bulkCreate(posts, {
    individualHooks: true,
    returning: true,
  });

  const commentSeeds = await Comment.bulkCreate(comments, {
    individualHooks: true,
    returning: true,
  });

  const userSeeds = await User.bulkCreate(users, {
    individualHooks: true,
    returning: true,
  });

  process.exit(0);
};

seedDatabase();

 

  

  
