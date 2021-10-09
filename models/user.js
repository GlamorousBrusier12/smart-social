const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const AVATAR_PATH = path.join('/uploads/users/avatars');

// Creating User schema using mongoose
const userSchema = new  mongoose.Schema({
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    name:{
        type: String,
        required : true
    },
    avatar:{
        type: String
    }
},{
    timestamps: true
});


// connetcting the multer and the path 
let storage = multer.diskStorage({
    // saving the destination of the file
    destination:function(req, file, cb) {
        cb(null, path.join(__dirname, '..',AVATAR_PATH));
    },
    // saving the uploaded file with date(epoch) appended to it 
    filename: function(req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now());
    }
});

// setting the static functions
userSchema.statics.uploadedAvatar = multer({ storage: storage}).single('avatar');
userSchema.statics.avatarpath = AVATAR_PATH; 


//creating the users collection (model) using mongoose
const Users = mongoose.model('Users', userSchema);



// finally exporting the users model
module.exports = Users;