const { User } = require("../models");

const userdata = [
  {
    username: "Maeby",
    email: "maeby@email.com",
    password: "pw12345",
    user_id: "1",
  },
  {
    username: "Tobias",
    email: "tobias@email.com",
    password: "pw12345",
    user_id: "2",
  },
  {
    username: "Lindsay",
    email: "lindsay@email.com",
    password: "pw12345",
    user_id: "3",
  },
  {
    username: "Lucille",
    email: "lucille@email.com",
    password: "pw12345",
    user_id: "4",
  },
];
const users = () => User.bulkCreate(userdata);

module.exports = users;
