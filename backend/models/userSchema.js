const _MONGOOSE_ = require('mongoose');


const _USER_SCHEMA_ = new _MONGOOSE_.Schema({
    email: {
        type: String,
        required: true, //true = not null
        minlength: 4,
        maxlength: 30,
        unique: true
    },
    name: {
        type: String,
        required: true, //true = not null
        minlength: 4,
        maxlength: 50
    },
    password: {
        type: String,
        required: true,
        minlength: 4,
        maxlength: 20
    },
    desc: {
        type: String,
        maxlength: 200
    },
    profilePic: {
        type: String
    },
    birthday: {
        type: Date
    },
    social: {
        twitter: { type: String },
        facebook: { type: String },
        instagram: { type: String },
        discord: { type: String }
    }

});

const _USER_ = _MONGOOSE_.model("user", _USER_SCHEMA_);
module.exports = _USER_;