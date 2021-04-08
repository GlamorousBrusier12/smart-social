const mongoose = require('mongoose');

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
    }
},{
    timestamps: true
});

//creating the users collection (model) using mongoose
const Users = mongoose.model('Users', userSchema);

// finally exporting the users model
module.exports = Users;