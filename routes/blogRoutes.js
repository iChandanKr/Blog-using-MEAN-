const express = require("express");
const blogController = require("../controllers/blogController");

const router = express.Router();

// --Blog ROUTES--
router.get("/create", blogController.blog_create_get);
router.get("/", blogController.blog_index);
router.post("/", blogController.blog_create_post);
router.get("/:id", blogController.blog_details);
router.delete("/:id", blogController.blog_delete);
router.get("/update/:id",blogController.blog_update_get);
router.put('/:id',blogController.blog_update_put);

module.exports = router;
