const _MONGOOSE_ = require('mongoose');

const _NOTIFICATION_SCHEMA_ = new _MONGOOSE_.Schema({
    user: {
        type: _MONGOOSE_.Schema.Types.ObjectId
    },
    notifications: [
        {
            origin: { type: String },
            from: { type: _MONGOOSE_.Schema.Types.ObjectId },
            active: { type: Boolean },
            date: { type: Date }
        }
    ]
});

const _NOTIFICATION_ = _MONGOOSE_.model("notification", _NOTIFICATION_SCHEMA_);
module.exports = _NOTIFICATION_;
