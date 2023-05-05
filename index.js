const { urlencoded } = require('express');
const express = require('express');

const port = 8282;

const app = express();

const path = require('path');

const db = require('./config/mongoose');

const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');

app.use(express.urlencoded());

app.set('view engine', 'ejs');
app.set('views',path.join(__dirname,'views'));

app.use(express.static('assets'));

app.use('/uploads', express.static(path.join(__dirname+'/uploads')));

app.use(session({
    name : "Maulik",
    secret : "Me",
    resave : true,
    saveUninitialized : false,
    cookie : {
        maxAge : 60*100*1000
    }
}))

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticationuser);

app.use('/', require('./routes/index'));

app.listen(port, (err) => {
    if(err)
    {
        console.log("Port Is Not Running");
    }
    console.log('Port is Running Now',port);
});