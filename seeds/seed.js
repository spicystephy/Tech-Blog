const sequelize = require('../config/connection');
const commentSeeds = require("./commentSeeds");
const postSeeds = require("./postSeeds");
const userSeeds = require('./userSeeds');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });
  await postSeeds();
  await commentSeeds();
  await userSeeds();
  
  process.exit(0);
};

seedDatabase();
