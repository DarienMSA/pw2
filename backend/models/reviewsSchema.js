const _MONGOOSE_ = require('mongoose');


const _REVIEW_SCHEMA_ = new _MONGOOSE_.Schema({
    gameId: {
        type: ObjectId,
        required: true
    },
    userId: {
        type: ObjectId,
        required: true
    },
    content: {
        type: String,
        required: true,
        minlength: 30,
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
        required: true
    },
    voteUsers: [
        {
            type: ObjectId
        }
    ]

});

const _REVIEW_ = _MONGOOSE_.model("review", _REVIEW_SCHEMA_);
module.exports = _REVIEW_;