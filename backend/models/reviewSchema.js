const _MONGOOSE_ = require('mongoose');


const _REVIEW_SCHEMA_ = new _MONGOOSE_.Schema({
    gameId: {
        type: _MONGOOSE_.Schema.Types.ObjectId,
        required: true,
        ref: 'game'
    },
    userId: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
        minlength: 0
    },
    date: {
        type: String
    },
    score: {
        type: Number,
        min: 0,
        max: 5
    },
    vote: {
        type: Number,

    },
    voteUsers: [
        {
            type: _MONGOOSE_.Schema.Types.ObjectId,
            ref: 'user'
        }
    ]

});

const _REVIEW_ = _MONGOOSE_.model("review", _REVIEW_SCHEMA_);
module.exports = _REVIEW_;