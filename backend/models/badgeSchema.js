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

const _USER_BADGES_SCHEMA_ = new _MONGOOSE_.Schema({
    gameId: {
        type: ObjectId,
        required: true
    },
    userId: {
        type: ObjectId,
        required: true
    },
    badges: [
        {
            type: ObjectId
        }
    ]

});

const _BADGE_ = _MONGOOSE_.model("badge", _BADGE_SCHEMA_);
module.exports = _BADGE_;

const _USER_BADGES_ = _MONGOOSE_.model("user_badges", _USER_BADGES_SCHEMA_);
module.exports = _USER_BADGES_;