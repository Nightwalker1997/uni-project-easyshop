const Mongoose = require('mongoose');

const UserSchema = new Mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email: {
        type : String,
        required: true
    },
    address: {
        type : String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true,
        default: Date.now()
    },
    AccessLevel: {
        type: String,
        default: 'newcomer',
        required: true
    }
});

module.exports = Mongoose.model('User', UserSchema);
