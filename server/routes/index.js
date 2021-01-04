const express = require('express');
const {check, validationResult} = require('express-validator');
const passport = require('passport');
const bcrypt = require('bcryptjs');

const path = require('path');
const nodemailer = require('nodemailer');

const Commodity = require('../models/commodity');
const User = require('../models/user');

const LocalStrategy = require('passport-local').Strategy;

let router = express.Router();

router.get('/home', (req, res) => {
    Commodity.find({})
        .then(commodity => {
            return res.status(200).json(commodity)
        })
        .catch(err => res.status(500).send(err));
});

router.post('/upload', async (req, res) => {

    if (!req.body.name) {
        return res.status(400).json({
            status: 'error',
            error: 'req body cannot be empty',
        });
    }

    const {name, price, about } = req.body;

    if (!req.files) {
        return res.status(500).send({ msg: "file is not found" })
    }

    // accessing the file
    const myFile = req.files.file;

    let Src = path.join(__dirname , '../../client/public/img/' ,myFile.name);
    myFile.mv(Src, (err) => {
        if (err) {
            return res.status(500).send({ msg: "Error occured", err });
        }
        return res.send({name: myFile.name, path: Src});
    });

    let imgSrc = path.join('/img/' ,myFile.name);

    console.log("src: ",imgSrc);
    try{
        await Commodity.findOne({name: name})
            .then(commodity => {
                if (commodity) return res.json({msg: 'already exist.', commodity});
                const newCommodity = new Commodity({
                    name,
                    price,
                    about,
                    imgSrc
                });
                newCommodity.save();
                return res.end();
                // return res.json(newCommodity).status(200);//give me fucking err
            })
            .catch(err => res.json({msg: 'failed', err}));
    }catch (err){
        console.log(err);
    }

});

router.get('/commodity/:_id', (req, res) =>{
    Commodity.findOne({_id: req.params._id})
        .then(commodity => {
            if (commodity) {
                return res.status(200).json(commodity);
            }
            return res.status(444).json({"msg": 'not found commodity.'});
        }).catch(err => res.status(599).json(err));
});

const ensureAuthenticated = (req, res, next) => {
    if (req.isAuthenticated){
        return next();
    }else{
        //ned to change status
        res.status(409).json({msg: "redirect"});
    }
};

router.post('/forgotpasssword', [check('email', 'Your email is not valid').not().isEmpty().isEmail().normalizeEmail(),
],(req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        res.status(422).jsonp(errors.array());
    } else {
        const { email} = req.body;

        User.findOne({ email: email})
            .then(user=>{
                if (user) {
                    let transporter = nodemailer.createTransport({
                        service: 'gmail',
                        auth: {
                            user: 'easyshop95234621@gmail.com',
                            pass: 'nightWalker7991'
                        }
                    });

                    let mailOptions = {
                        from: 'easyshop95234621@gmail.com',
                        to: 'gholamreza.fallah2208@gmail.com',
                        subject: 'Sending Email using Node.js for test',
                        text: 'sorry if your wrong person'
                    };

                    transporter.sendMail(mailOptions, function(error, info){
                        if (error) {
                            console.log(error);
                        } else {
                            console.log('Email sent: ' + info.response);
                        }
                    });

                    return res.status(200).json({msg: "new password is send to your email."});
                }else{
                    return res.status(465).json({msg: "user dosen't exist."});
                }
            })
            .catch(err => res.status(500).json(err));
    }
})

router.post('/signup', [
    check('name').exists().isLength({min: 3, max: 32}).trim().escape().withMessage('Name must have more than 3 characters and less than 32 characters'),
    check('email', 'Your email is not valid').not().isEmpty().isEmail().normalizeEmail(),
    check('password', 'Your password must be at least 8 characters and max 32 characters').not().isEmpty().isLength({min: 8, max: 32}),
    check('confirmPassword', 'Passwords do not match').custom((value, {req}) => (value === req.body.password)),
], (req, res) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        res.status(422).jsonp(errors.array());
    } else {
        const {name, email, address, password, confirmPassword} = req.body;

        User.findOne({ email: email})
            .then(user=>{
                if (user) return res.status(200).json({msg: "user already exist. do you forget your password?"});

                const newUser = new User({
                    name,
                    email,
                    address,
                    password
                });

                bcrypt.genSalt(11, (err, salt) => {
                    if (err) return res.status(500).json(err);
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if (err) return res.status(500).json(err);
                        newUser.password = hash;
                        newUser.save()
                            .then(user => res.status(201).json({msg: "user successfully created.", user}))
                            .catch(err => res.status(500).json(err));
                    })
                });

            })
            .catch(err => res.status(500).json(err));
    }
});

passport.use(new LocalStrategy(
    (username, password, done) => {
        User.findOne({ email: username })
            .then(user => {
                if (!user) {
                    return done(null, false, { message: 'Incorrect email.' });
                }
                bcrypt.compare(password, user.password, (err, res) => {
                    if (err) return res.status(500).json(err);
                    if (res) {
                        return done(null, user);
                    }
                    else {
                        return done(null, false, { message: 'Incorrect password.' });
                    }
                })
            })
            .catch(err => done(err));
    }
));

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
        done(err, user);
    });
});

router.post('/login', [
    check('username','Your email is not valid').not().isEmpty().isEmail().normalizeEmail(),
    check('password', 'Your password must be at least 8 characters and max 32 characters').not().isEmpty().isLength({min: 8, max: 32}),
],(req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
        return res.status(422).jsonp(errors.array());
    else
        passport.authenticate('local', (err, user, info) => {
            if (err) return res.status(500).json(err);

            if (!user) return res.status(404).json({message: "User not Found."});

            req.login(user, err => {
                if (err) return res.status(500).json(err);

                return res.json(user).status(200);
            });
        })(req, res);
});

router.get('/logout', (req, res) => {
    res.status(205).json({msg: "no content, refresh."});
});

router.all('*', (req, res) => {
    res.status(404).send('<div align="center"><h1>404</h1><br>Wrong path Click <a href="/">here</a> to go HomePage.</div>');
});

module.exports = router;
