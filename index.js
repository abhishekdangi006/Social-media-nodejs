const express = require('express');
const app = express();
const port = 8000;
const expressLayout = require('express-ejs-layouts');
const db = require('./config/mongoose');
const cookieParser = require('cookie-parser');

// used for session cookie
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const MongoStore = require('connect-mongo');

const sassMiddleware = require('node-sass-middleware');

app.use(sassMiddleware({
    src: './assets/scss',
    dest: './assets/css',
    debug: true,
    outputStyle: 'extended',
    prefix: '/css'
}));

//to get the post request
app.use(express.urlencoded());

//using the cookie parser
app.use(cookieParser());

//using the express layout
app.use(expressLayout);

//using static files
app.use(express.static('./assets'));

// extracting styles and scripts from subpages to layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

//setup the view engine
app.set('view engine', 'ejs');
app.set('views', './views');

// mongo store is used to store the session cookie in the db
app.use(session({
    name: 'codial',
    //TODO change the secret before deployment in production mode
    secret: 'blashsomething',
    saveUninitialized: false,
    resave: false,
    cookie:{
        maxAge:(1000* 60 * 100)
    },
    store: MongoStore.create({
    // store: new MongoStore({
            mongoUrl: ('mongodb://127.0.0.1:27017/codial_devlopment'),
            mongooseConnection: db,
            autoRemove: 'disabled'
    },
    function(err){
        if(err){
            console.log("error in mongo store using" , err);
        }else{
            console.log("mongo store is working fine");
        }
        
    })
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

// using the express router
app.use('/', require('./routes'));

app.listen(port, function(err){
    if(err){
        console.log(`Error is showing while running express server: ${err}`);
    }

    console.log(`Your express server is now live on port: ${port}`);
});