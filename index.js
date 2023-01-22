const express = require('express');
const app = express();
const port = 8000;

// using the express router
app.use('/', require('./routes'));
app.listen(port, function(err){
    if(err){
        console.log(`Error is showing while running express server: ${err}`);
    }

    console.log(`Your express server is now live on port: ${port}`);
});