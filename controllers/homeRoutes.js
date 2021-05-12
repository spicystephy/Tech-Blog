const router = require("express").Router();
const { Post, Comment, User } = require("../models");
const sequelize = require("../config/connection");
const withAuth = require("../utils/auth");

//homepage with users' posts
router.get("/", async (req, res) => {
  try {
    const postData = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ["username"],
        },
      ],
    });
    const posts = postData.map((post) => post.get({ plain: true }));
    res.render("homepage", {
      posts,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/login", (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/");
    return;
  }

  res.render("login");
});

router.get("/posts/:id", async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ["username"],
        },
      ],
    });
    const posts = postData.get({ plain: true });

    res.render("post", {
      ...posts,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

//   const commentData = await Comment.findAll({
//     where: { post_id: this.post.id },
//     include: {
//       model: User,
//       attributes: ["id", "username"],
//     },
//   });
//   const comments = commentData.map((comment) => comment.get());
// });

module.exports = router;
