const router = require('express').Router();
const { Post, Comment, User } = require('../models');
const sequelize = require('../config/connection');

router.get('/', async (req, res) => {
  try {
    const postData = await Post.findAll({
      attributes: ["id", "title", "post-text", "created-at"],
      order: [['created-at', 'DESC']],
    });

    const posts = postData.map((project) => project.get({ plain: true }));

    res.render('homepage', {
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
