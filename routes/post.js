const express = require("express");
const router = express.Router();
const {isLoggedIn} = require("../middlewares/isLoggedIn");
const upload = require("../config/multer-config");
const { postPage, postCreate, likePost } = require("../controllers/post-controller");


//post page
router.get("/", isLoggedIn, postPage);
router.post("/uploadPost", isLoggedIn , upload.single("postPic"), postCreate)

//like post
router.get("/like/:id", isLoggedIn,  likePost)

module.exports = router