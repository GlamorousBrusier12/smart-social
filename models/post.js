const mongoose = require('mongoose');
const User = require('./user');
const postSchema = new mongoose.Schema({
    content:{
        type: String,
        required: true
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users' // linking it to the user schema
    },
    comments:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Comments' // linking it to the user schema
        }
    ]
},{
    timestamps: true
});

// creating a collection which contains the schema instances by mongooose.model('name of th ecollection', schema to be followed)
const Posts = mongoose.model('Posts', postSchema);

module.exports = Posts;