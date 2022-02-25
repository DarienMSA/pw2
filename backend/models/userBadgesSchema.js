const _MONGOOSE_ = require('mongoose');

const _USER_BADGES_SCHEMA_ = new _MONGOOSE_.Schema({
    gameId: {
        type: _MONGOOSE_.Schema.Types.ObjectId,
        required: true,
        ref: 'game'
    },
    userId: {
        type: _MONGOOSE_.Schema.Types.ObjectId,
        required: true,
        ref: 'user'
    },
    badges: [
        {
            type: _MONGOOSE_.Schema.Types.ObjectId,
            ref: 'badge'
        }
    ]

});

const _USER_BADGES_ = _MONGOOSE_.model("user_badges", _USER_BADGES_SCHEMA_);
module.exports = _USER_BADGES_;