const express = require("express");
const router = express.Router();
const BlogController = require('../controllers/BlogController')


/**
 * GET /
 * Admin Login Page
*/
router.get('/admin', BlogController.blog_admin)

module.exports = router;