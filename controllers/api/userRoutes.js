const router = require("express").Router();
const { User, Post, Comment } = require("../../models");
const withAuth = require("../../utils/auth");

//renders user's homepage
router.get("/", withAuth, async (req, res) => {
  try {
    const userData = await User.findOne(req.body);
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.render("homepage", userData);
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

//allows user to sign up
router.post("/signup", async (req, res) => {
  try{
    const userData = await User.create({
    username:req.body.username,
    email: req.body.email,
    password: req.body.password,
  });
  req.session.save(() => {
    req.session.user_id = userData.id;
    req.session.logged_in = true;
    res.json({ user: userData, message: "You are now logged in!" });
  });
  res.redirect("/")
  }catch (err){
    res.status(500).json(err);
  }
});

//allows user to login if already has account
router.post("/login", async (req, res) => {
  try {
    const userData = await User.findOne({ where: { email: req.body.email } });
    if (!userData) {
      res
        .status(400)
        .json({ message: "Incorrect email or password, please try again" });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);
    console.log(validPassword);
    if (!validPassword) {
      res
        .status(400)
        .json({ message: "Incorrect email or password, please try again" });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.json({ user: userData, message: "You are now logged in!" });
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

//allows user to leave session
router.post("/logout", (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
