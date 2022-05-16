const _MONGOOSE_ = require('mongoose');

const _NOTIFICATION_SCHEMA_ = new _MONGOOSE_.Schema({
    user: {
        type: _MONGOOSE_.Schema.Types.ObjectId,
        ref: 'user'
    },
    origin: { type: String },
    fromUser: { type: _MONGOOSE_.Schema.Types.ObjectId, ref: 'user' },
    fromGame: { type: _MONGOOSE_.Schema.Types.ObjectId, ref: 'game' },
    active: { type: Boolean },
    date: { type: String }
});

const _NOTIFICATION_ = _MONGOOSE_.model("notification", _NOTIFICATION_SCHEMA_);
module.exports = _NOTIFICATION_;
