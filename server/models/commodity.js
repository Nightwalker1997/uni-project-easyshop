const Mongoose = require('mongoose');

const Commodity = new Mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price:{
        type: Number,
        required: true
    },
    about: {
        type: String,
        required: true
    },
    imgSrc: {
        type: String,
        required: true
    }
});

module.exports =  Mongoose.model('commodity', Commodity);
