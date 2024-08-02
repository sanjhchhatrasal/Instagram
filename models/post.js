const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
    user: {
         type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required : true
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
        type: Buffer,
        required: true
    },
    likes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    ],
    comments: [
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
                required : true

            },
            content: {
                type: String,
                required: true
            }
        }
    ]
}, {timestamps: true})

module.exports = mongoose.model("post", postSchema);
