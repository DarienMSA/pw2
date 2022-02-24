const _MONGOOSE_ = require('mongoose');


const _GENRE_SCHEMA_ = new _MONGOOSE_.Schema({
    name: {
        type: String,
        required: true, //true = not null
        unique: true,
        minlength: 0,
        maxlength: 100
    },
    desc: {
        type: String,
        minlength: 0,
        maxlength: 100
    }

});

const _GENRE_ = _MONGOOSE_.model("genre", _GENRE_SCHEMA_);
module.exports = _GENRE_;