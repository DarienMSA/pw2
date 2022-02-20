const _MONGOOSE_ = require('mongoose');


const _GENRES_SCHEMA_ = new _MONGOOSE_.Schema({
    name: {
        type: String,
        required: true, //true = not null
        unique: true
    },
    desc: {
        type: String
    }

});

const _GENRE_ = _MONGOOSE_.model("genre", _GENRES_SCHEMA_);
module.exports = _GENRE_;