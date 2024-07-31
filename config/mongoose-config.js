const mongoose = require("mongoose");


 mongoose.connect(`${process.env.MONGO_DB_URI}`)
.then(function(){
        console.log("Connected to db");
})
.catch(function(error){
    console.log(error.message)
})

const db = mongoose.connection;

module.exports = db;

 