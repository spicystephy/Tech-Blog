const router = require("express").Router();
const { User } = require("../../models");


//allows user to sign up
// router.post("/signup", async (req, res) => {
//   const userData = req.body;
//   const user = await User.create(req.body);
//   //can use insomnia to check and will need to post required input from models/user.js
//   req.session.save(() => {
//     req.session.user_id = userData.id;
//     req.session.logged_in = true;

//     res.json({ user: userData, message: "You are now logged in!" });
//   });
// });

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
