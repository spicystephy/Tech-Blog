// const { User } = require("../models");

const userdata = [
  {
    username: "Maeby",
    email: "maeby@email.com",
    password: "pw12345",
  },
  {
    username: "Tobias",
    email: "tobias@email.com",
    password: "pw12345",
  },
  {
    username: "Lindsay",
    email: "lindsay@email.com",
    password: "pw12345",
  },
  {
    username: "Lucille",
    email: "lucille@email.com",
    password: "pw12345",
  },
];
// const users = () => await User.bulkCreate(userdata, {
//   individualHooks: true,
//   returning: true,
// });

module.exports = userdata;
