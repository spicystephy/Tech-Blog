const router = require("express").Router();
const { Comment } = require("../../models");
const withAuth = require("../../utils/auth");

//get all comments
router.get("/", async (req, res) => {
  try {
    const commentData = await Comment.findAll();
    res.status(200).json(commentData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// new comment posting
router.post("/", async (req, res) => {
  try {
    const commentData = await Comment.create({
        comment_text: req.body.comment_text,
        post_id: req.body.post_id,
        user_id: req.session.user_id
    })
    res.status(200).json(commentData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// update a comment by id
router.put("/:id", async (req, res) => {
  try {
    const commentData = await Comment.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json(commentData);
  } catch (error) {
    res.status(400).json(err);
  }
});

//delete comment by id
router.delete("/:id", async (req, res) => {
  try {
    const commentData = await Comment.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!commentData) {
      res.status(404).json({ message: "Try again!" });
      return;
    }

    res.status(200).json(commentData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
