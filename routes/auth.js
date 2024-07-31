const express = require("express");
const router = express.Router();
const {registerUserPage, loginUserPage, profilePage, registerUser, logout, loginUser, editPage, uploadPage, profilePic, feedPage, searchPage} = require("../controllers/auth-controller");
const {isLoggedIn} = require("../middlewares/isLoggedIn");
const upload = require("../config/multer-config");


//Register user
router.get("/", registerUserPage);
router.post("/register", registerUser);


//Login User
router.get("/login", loginUserPage);
router.post("/login", loginUser);


//Profile page
router.get("/profile", isLoggedIn , profilePage);


//edit Profile page
router.get("/edit/:id", isLoggedIn,  editPage);
router.post("/update/:id", isLoggedIn, upload.single("editProfileImage"),  uploadPage);

//profile pic
router.post("/profilePic", isLoggedIn, profilePic );

//feed page
router.get("/feed", isLoggedIn,  feedPage);

//search page
router.get("/search", isLoggedIn, searchPage)

//logout route
router.get("/logout", logout)

module.exports = router;