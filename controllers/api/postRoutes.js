const router = require("express").Router();
const { User, Post, Comment } = require("../../models");
const sequelize = require("../../config/connection");
const withAuth = require("../../utils/auth");

//get all posts, sort in descending order
router.get("/", async (req, res) => {
  try {
    const postData = await Post.findAll({
      attributes: ["id", "post_text", "title", "created_at"],
      order: [["created_at", "DESC"]],
      include: [
        {
          model: User,
          attributes: ["username"],
        },
        {
          model: Comment,
          attributes: [
            "id",
            "comment_text",
            "post_id",
            "user_id",
            "created_at",
          ],
          include: {
            model: User,
            attributes: ["username"],
          },
        },
      ],
    });
    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

//gets a single post by id
router.get("/:id", async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      attributes: ["id", "post_text", "title", "created_at"],
      include: [
        {
          model: User,
          attributes: ["username"],
        },
        {
          model: Comment,
          attributes: [
            "id",
            "comment_text",
            "post_id",
            "user_id",
            "created_at",
          ],
          include: {
            model: User,
            attributes: ["username"],
          },
        },
      ],
    });
    if (!postData) {
      res.status(404).json({ message: "No post found with that id!" });
      return;
    }
    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

//create new posts
router.post("/", withAuth, async (req, res) => {
  try {
    const postData = await Post.create({
      title: req.body.title,
      post_text: req.body.post_text,
      user_id: req.session.user_id,
    });

    res.status(200).json(postData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// update a post by id
router.put("/:id", withAuth, async (req, res) => {
  try {
    const postData = await Post.update(req.body, {
      where: {
        id: req.params.id
      },
    });
    res.status(200).json(postData);
  } catch (error) {
    res.status(400).json(err);
  }
});

//delete posts
router.delete("/:id", withAuth, async (req, res) => {
  try {
    const postData = await Post.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!postData) {
      res.status(404).json({ message: "No post found with that id!" });
      return;
    }

    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
