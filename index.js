const express = require('express');
const app = express();
const port = 8000;
const expressLayout = require('express-ejs-layouts');
const db = require('./config/mongoose');
const cookeParser = require('cookie-parser');
// require passport (authentication) and express sessions to use (session cookies)
const passport = require('passport');
const session = require('express-session');
const passportLocal = require('./config/local-strategies');
const passportJWT = require('./config/passport-jwt-strategy');
//  require connect-mongo 
const mongoDriver = require('connect-mongo');
// require scss 
const sassMiddleWare = require('node-sass-middleware');
// require the connect-flash library
const flash = require('connect-flash');
// require the custom middleware
const customMware = require('./config/middleware');
app.use(sassMiddleWare({
    src: './assets/scss',
    dest: './assets/css',
    // debug: true,
    outputStyle: 'extended',
    prefix: '/css'
}));
// setup url encoder for decoding the post data
app.use(express.urlencoded());

// use cookieparser using middleware
app.use(cookeParser());

//setting up the static files 
app.use(express.static('./assets')); 

// setting uploads folder as static folder and making it available for the browser as well
app.use('/uploads', express.static(__dirname + '/uploads'));

// extracting the link(CSS) files and script files and placeing them wherever needed
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

// inculding the express layout
app.use(expressLayout);


// require the router file by middleware 

// setting the view engine 
app.set('view engine', 'ejs');
app.set('views', './views');

// we use mongo store to store the session cookies
app.use(session({
    name: 'smart social',
    secret: 'rcb',
    saveUninitialized: false,
    resave: false,
    cookie:{
        maxAge: ( 1000 * 60 * 100 )
    },
    store: new mongoDriver({
        autoRemove: 'disabled',
        mongooseConnection: db,
        mongoUrl: 'mongodb://localhost/smart-social-development'
    }, function (err) {
        console.log(err);
    })
}));

// use the passport js
app.use(passport.initialize());
// inititate the session cookie
app.use(passport.session());

//set user authentication
app.use(passport.setAuthenticatedUser); 

// use flash 
app.use(flash());
// use cutsom middleware for setting the flash
app.use(customMware.setFlash);

app.use('/',require('./routes'));

//checking whether the servers is listening to the port 
app.listen(port, function (err) {
    if (err) {
        console.log(`Error is starting the server: ${err}`);
    }
    console.log(`Your server is sucessfully running on the port: ${port}`);
})