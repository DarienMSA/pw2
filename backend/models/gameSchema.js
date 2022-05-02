const _MONGOOSE_ = require('mongoose');


const _GAME_SCHEMA_ = new _MONGOOSE_.Schema({
    name: {
        type: String,
        required: true, //true = not null
        unique: true,
        minlength: 0
    },
    synopsis: {
        type: String,
        required: true,
        minlength: 0,
        maxlength: 1200
    },
    studio: {
        type: String,
    },
    launchDate: {
        type: Date
    },
    score: {
        type: Number,
        min: 0,
        max: 5
    },
    image: {
        type: String,
        required: true
    },
    activeUsers: [
        {
            type: _MONGOOSE_.Schema.Types.ObjectId,
            ref: 'user'
        }
    ],
    activeUsersLength: {
        type: Number
    },
    reviewsLength: {
        type: Number
    },
    gameDuration: {
        type: String
    },
    genres: [
        {
            type: _MONGOOSE_.Schema.Types.ObjectId,
            ref: 'genre'
        }
    ]

});

const _GAME_ = _MONGOOSE_.model("game", _GAME_SCHEMA_);
module.exports = _GAME_;