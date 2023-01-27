const express = require('express');
const app = express();
const port = 8000;
const expressLayout = require('express-ejs-layouts');

//using static files
app.use(express.static('./assets'));

// extracting styles and scripts from subpages to layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

//using the express layout
app.use(expressLayout);

// using the express router
app.use('/', require('./routes'));

//setup the view engine
app.set('view engine', 'ejs');
app.set('views', './views');

app.listen(port, function(err){
    if(err){
        console.log(`Error is showing while running express server: ${err}`);
    }

    console.log(`Your express server is now live on port: ${port}`);
});