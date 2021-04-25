const router = require('express').Router();
const { Post, Comment, User } = require('../models');
const sequelize = require('../config/connection');
const withAuth = require("..utils/auth");

//homepage with user's posts
router.get('/', async (req, res) => {
  try {
    const postData = await Post.findAll({
      include: [User]
    });

    const posts = postData.map((post) => post.get({ plain: true }));

    res.render("homepage", {
      posts,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});


router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

module.exports = router;
