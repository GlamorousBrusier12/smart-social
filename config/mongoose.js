const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/smart-social-development',{ 
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
 });


// mongoose.connect('your db url', {
//     useCreateIndex: true,
//     useNewUrlParser: true
// })

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Error in connecting to the databse'));

db.once('open', function (params) {
    console.log('connected to the databse sucessfully');
});

module.exports = db;