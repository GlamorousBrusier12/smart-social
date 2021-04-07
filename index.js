const express = require('express');
const app = express();
const port = 8000;

//checking whether the servers is listening to the port 
app.listen(port, function (err) {
    if (err) {
        console.log(`Error is starting the server: ${err}`);
    }
    console.log(`Your server is sucessfully running on the port: ${port}`);
})