const _MONGOOSE_ = require('mongoose');


const _REVIEW_SCHEMA_ = new _MONGOOSE_.Schema({
    gameId: {
        type: _MONGOOSE_.Schema.Types.ObjectId,
        required: true
    },
    userId: {
        type: _MONGOOSE_.Schema.Types.ObjectId,
        required: true
    },
    content: {
        type: String,
        required: true,
        minlength: 0,
        maxlength: 140
    },
    date: {
        type: Date
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
            type: _MONGOOSE_.Schema.Types.ObjectId
        }
    ]

});

const _REVIEW_ = _MONGOOSE_.model("review", _REVIEW_SCHEMA_);
module.exports = _REVIEW_;