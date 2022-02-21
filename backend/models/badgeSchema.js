const _MONGOOSE_ = require('mongoose');


const _BADGE_SCHEMA_ = new _MONGOOSE_.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    desc: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    }

});



const _BADGE_ = _MONGOOSE_.model("badge", _BADGE_SCHEMA_);
module.exports = _BADGE_;

