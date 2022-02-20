const _MONGOOSE_ = require('mongoose');


const _GAME_SCHEMA_ = new _MONGOOSE_.Schema({
    name: {
        type: String,
        required: true, //true = not null
        unique: true
    },
    synopsis: {
        type: String,
        required: true
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
            type: ObjectId
        }
    ],
    genres: [
        {
            type: ObjectId
        }
    ]

});

const _GAME_ = _MONGOOSE_.model("game", _GAME_SCHEMA_);
module.exports = _GAME_;