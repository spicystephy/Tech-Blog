const { Comment } = require("../models");

const commentdata = [
  {
    comment_text: "First comment test.",
    user_id: 1,
    post_id: 1,
  },
  {
    comment_text: "Second comment test;",
    user_id: 2,
    post_id: 2,
  },
  {
    comment_text: "Third comment test?",
    user_id: 3,
    post_id: 3,
  },
  {
    comment_text: "Fourth comment test!",
    user_id: 4,
    post_id: 4,
  },
];

const comments = () => Comment.bulkCreate(commentdata);

module.exports = comments;