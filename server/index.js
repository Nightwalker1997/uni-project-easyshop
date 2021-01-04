const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const passport = require('passport')

const config = require('./config');
const routes = require('./routes');
//connect with db
mongoose.connect(config.mongooseUrl, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => console.log("mongodb connected ..."))
    .catch(err => console.error(err));

let APP = express();

let SERVER = http.createServer(APP);



// // parse application/x-www-form-urlencoded
APP.use(bodyParser.urlencoded({limit: '1024mb', extended: true}));
// // // parse application/json
APP.use(bodyParser.json({limit: '1024mb', extended: true}));
// parse application/x-www-form-urlencoded
// APP.use(bodyParser.urlencoded({ extended: false }));

APP.use(cors());


APP.use(fileUpload());

APP.use(cookieParser());

//Set Static Folder
//Express Session
// APP.set('trust proxy', 1); // trust first proxy

// app.use(session({
//     secret: 'keyboard cat',
//     resave: false,
//     saveUninitialized: true,
//     cookie: { secure: true }
// }));

/*  PASSPORT SETUP  */
APP.use(passport.initialize());
APP.use(passport.session());




APP.use('/', routes);


SERVER.listen(config.PORT, config.HOSTNAME, () => {
    console.log(`Server running at http://${config.HOSTNAME}:${config.PORT}`);
});
