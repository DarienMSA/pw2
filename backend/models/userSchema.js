const _MONGOOSE_ = require('mongoose');


const _USER_SCHEMA_ = new _MONGOOSE_.Schema({
    email: {
        type: String,
        required: true, //true = not null
        minlength: 4,
        maxlength: 60,
        unique: true
    },
    name: {
        type: String,
        required: true, //true = not null
        minlength: 4,
        maxlength: 50
    },
    /*password: {
        type: String,
        required: true,
        minlength: 4,
        maxlength: 20
    },*/
    desc: {
        type: String,
        maxlength: 200
    },
    profilePic: {
        type: String
    },
    birthday: {
        type: String
    },
    social: {
        twitter: { type: String },
        facebook: { type: String },
        instagram: { type: String },
        discord: { type: String }
    },
    notifications: {
        type: _MONGOOSE_.Schema.Types.ObjectId,
        ref: 'notification'
    }

});

const _USER_ = _MONGOOSE_.model("user", _USER_SCHEMA_);
module.exports = _USER_;