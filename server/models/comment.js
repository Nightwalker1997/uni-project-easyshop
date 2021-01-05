const Mongoose = require('mongoose');

const Comment = new Mongoose.Schema({
    commodity_id: {
        type: String,
        required: true
    },
    author:{
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true,
        default: Date.now()
    }
});

module.exports =  Mongoose.model('comment', Comment);
