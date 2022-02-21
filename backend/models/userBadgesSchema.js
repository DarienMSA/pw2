const _MONGOOSE_ = require('mongoose');

const _USER_BADGES_SCHEMA_ = new _MONGOOSE_.Schema({
    gameId: {
        type: _MONGOOSE_.Schema.Types.ObjectId,
        required: true
    },
    userId: {
        type: _MONGOOSE_.Schema.Types.ObjectId,
        required: true
    },
    badges: [
        {
            type: _MONGOOSE_.Schema.Types.ObjectId
        }
    ]

});

const _USER_BADGES_ = _MONGOOSE_.model("user_badges", _USER_BADGES_SCHEMA_);
module.exports = _USER_BADGES_;