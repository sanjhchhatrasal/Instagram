const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
    user: {
         type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    content: {
        type: String,
        required: true
    }
});

const postSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    caption: {
        type: String,
        required: true
    },
    postPic: {
        type: String,
        required: true
    },
    likes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    ],
    comments: {
        type: [commentSchema]
    }
}, {timestamps: true})

module.exports = mongoose.model("post", postSchema);
