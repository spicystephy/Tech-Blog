const router = require("express").Router();
const sequelize = require('../config/connection');
const { Post, Comment, User } = require('../models');
const withAuth = require("../utils/auth");

router.get("/"), async (req,res) => {
    const postData = await Post.findAll({
        where: {user_is: req.session.userId},
    })
    res.render("dashboard", postData)
}

