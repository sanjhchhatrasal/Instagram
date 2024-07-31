const jwt = require("jsonwebtoken");

const tokenGenerator = function(data){
    return jwt.sign(data, process.env.SECRET_JWT)
}

module.exports = tokenGenerator;