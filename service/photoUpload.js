const path = require('path')
const multer = require('multer')
const User = require('../model/User')

var photoStorage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null, 'uploads/')
    },
    filename: function(req, file, cb){
        let ext = path.extname(file.originalname)
        cb(null, Date.now() + ext)
    }
})

var upload = multer ({
    storage: photoStorage,
    fileFilter: function(req, file, callback){
        User.findOne({ email: req.body.email })
        .then(existingUser => {
            if (existingUser) {
                callback(null, false)
            } 
            else{ 
                if(file.mimetype == "image/png" || file.mimetype == "image/jpeg"){
                    callback(null, true)    
                }else {
                    console.log("Only .jpg or .png file supported!")
                    callback(null, false)
                }
            }
        })
    },
    limits: {
        fileSize: 1024 * 1024 * 2
    }
})

module.exports = upload