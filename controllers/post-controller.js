const postModel = require("../models/post");
const userModel = require("../models/user");


module.exports.postPage = async (req, res) => {
    let user = await userModel.findOne({email: req.user.email});
    res.render("post", {user})
}

module.exports.postCreate = async (req, res) => {
  try{
    let user = await userModel.findOne({email: req.user.email});
    let post = await postModel.create({
        user: user._id,
        caption: req.body.caption,
        postPic: req.file.buffer
    })
    user.posts.push(post._id);
    await user.save();
    console.log("successfully posted")
    console.log(post)
    res.redirect("/feed")
  } catch (error){
    res.send(`Error while posting ${error}`)
    console.log("cannot post")
  }
}

module.exports.likePost = async (req, res) => {
  let post = await postModel.findOne({_id: req.params.id}).populate("user");

  if(post.likes.indexOf(req.user.userid) === -1){
      post.likes.push(req.user.userid)
  }
  else{
      post.likes.splice(post.likes.indexOf(req.user.userid), 1)
  }
  await post.save();
    console.log("user id", req.user.userid)
    res.redirect("/feed");
}