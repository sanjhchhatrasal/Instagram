const jwt = require("jsonwebtoken");
const userModel = require("../models/user");

module.exports.isLoggedIn = async (req, res, next) =>{
    if(req.cookies.token){
        const data = jwt.verify(req.cookies.token, process.env.SECRET_JWT);
        let user = await userModel.findOne({email: data.email}).select("-passsword");
        req.user = data;
        next()
    } 
    if(!req.cookies.token){
        res.status(404).redirect("/")
    }
}