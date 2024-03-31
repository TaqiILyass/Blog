const express = require("express");
const router = express.Router();
const BlogController = require('../controllers/BlogController')


/**
 * GET /
 * Home
*/
// All Blogs
router.get("/", BlogController.blog_all);

/**
 * GET /
 * Post:id
*/
// Details Blog
router.get('/post/:id', BlogController.blog_details)

/**
 * GET /
 * Post SearchTerm
*/
router.post('/search', BlogController.blog_search)

router.get("/about", (req, res) => {
  res.render("about");
});

module.exports = router;
