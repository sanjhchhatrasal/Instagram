const express = require("express");
const app = express();
const path = require("path");
const authRouter = require("./routes/auth.js");
const postRouter = require("./routes/post.js")

require("dotenv").config();
const db = require("./config/mongoose-config.js");
const cookieParser = require("cookie-parser");

app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

app.use("/", authRouter);
app.use("/post", postRouter);

app.listen(process.env.PORT || 3000);