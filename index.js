const express = require('express');
const app = express();
const port = 8000;
const expressLayout = require('express-ejs-layouts');
const db = require('./config/mongoose');

//setting up the static files 
app.use(express.static('./assets')); 

// extracting the link(CSS) files and script files and placeing them wherever needed
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

// inculding the express layout
app.use(expressLayout);

// require the router file by middleware 
app.use('/',require('./routes'));

// setting the view engine 
app.set('view engine', 'ejs');
app.set('views', './views');

//checking whether the servers is listening to the port 
app.listen(port, function (err) {
    if (err) {
        console.log(`Error is starting the server: ${err}`);
    }
    console.log(`Your server is sucessfully running on the port: ${port}`);
})