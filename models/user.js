const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true
    },
    bio: {
        type: String
    },
    profilePic: {
        type: Buffer,
        default: "default.webp"
    },
    posts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "post"
        }
    ]
})

module.exports = mongoose.model("User", userSchema);