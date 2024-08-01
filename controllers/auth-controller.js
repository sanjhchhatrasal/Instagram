const userModel = require("../models/user");
const postModel = require("../models/post");
const bcrypt = require("bcrypt");
const generateToken = require("../utils/generateToken");

module.exports.registerUserPage = async (req, res) => {
    res.render("register", {footer: false});
}

 module.exports.registerUser = async (req, res) => {
   try{
    let {username, name, email, password} = req.body;

    let user = await userModel.findOne({email})
    if(user) return res.redirect("/login");

     let salt = await bcrypt.genSalt(10)
    let hash = await bcrypt.hash(password, salt) 

     user = await userModel.create({
        username,
        name,
        email,
        password: hash
    })   
    let token = generateToken({email, userid: user._id});
    res.cookie("token", token ,{
        httpOnly: true,
        secure: true,
        maxAge: 30 * 24 * 60 * 60 * 1000
    })
    res.redirect("/profile");
    console.log("token", token)
} catch (error){
    console.error(error)
}
   } 

module.exports.loginUserPage = async (req, res) => {
    res.render("login", {footer: false});
}

 module.exports.loginUser = async (req, res) => {
   try{
    let {email, password} = req.body;
    let user = await userModel.findOne({email});
    if(!user) return res.redirect("/");

    let securedPassword = await bcrypt.compare(password, user.password);
    if(securedPassword){
        let token = generateToken({email, userid: user._id});
        res.cookie("token", token, {
            httpOnly: true,
            secure: true
        });
        res.redirect("/profile");
    } else{
        res.redirect("/login");
    }
   } catch(error){
    console.error(error)
    res.send("server error")
   }
} 

module.exports.profilePage = async (req, res) => {
    let user = await userModel.findOne({email: req.user.email}).populate({
        path: 'posts',
        populate: {
            path: 'user', 
            select: 'username profilePic' 
        }
    });

    res.render("profile", {user});
}

module.exports.editPage = async (req, res) => {  
    let user = await userModel.findOne({_id: req.params.id});
    res.render("edit", {user})
}

module.exports.uploadPage = async (req, res) => {
    let user = await userModel.findOneAndUpdate({_id: req.params.id}, {name: req.body.name, username: req.body.username, bio: req.body.bio }, {new: true});
   if(req.file){
    user.profilePic = req.file.buffer;
    await user.save();
   }
   
    console.log(user)
    res.redirect("/profile")
}

module.exports.profilePic = async (req, res) => {
    let user = await userModel.findOne({email: req.user.email})
    res.redirect("/profile");
}

module.exports.feedPage = async (req, res) =>{
    let user = await userModel.findOne({email: req.user.email})
    let posts = await postModel.find().populate({
        path: "user",
        select: "username profilePic"
    })
    res.render("feed", {user, posts})
}


module.exports.searchPage = async (req, res) => {
    let user = await userModel.findOne({email: req.user.email});
    res.render("search", {user})
}

module.exports.logout = async (req, res) => {
    res.cookie("token", "")
    res.redirect("/login");
}