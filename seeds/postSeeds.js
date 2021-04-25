const { Post } = require("../models");

const posts = [
  {
    post_text: "First post test.",
    user_id: 1,
    post_id: 1,
  },
  {
    post_text: "Second post test;",
    user_id: 2,
    post_id: 2,
  },
  {
    post_text: "Third post test?",
    user_id: 3,
    post_id: 3,
  },
  {
    post_text: "Fourth post test!",
    user_id: 4,
    post_id: 4,
  },
];

module.exports = posts;
