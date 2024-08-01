const multer = require("multer");
const path = require("path");
const storage = multer.memoryStorage();

function fileFilter (req, file,  cb){
    let extname = [".jpeg", ".jpg", ".webp" , ".png"];
    let ext = path.extname(file.originalname);

    let included = extname.includes(ext);

    if(included){
        cb(null, true)
    } else{
        cb(new Error("These files are not allowed", false))
    }
}


const upload = multer({storage: storage, fileFilter: fileFilter});

module.exports = upload