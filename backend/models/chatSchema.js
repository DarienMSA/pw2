const _MONGOOSE_ = require('mongoose');

const _CHAT_SCHEMA_ = new _MONGOOSE_.Schema({
    members: [
        {
            type: _MONGOOSE_.Schema.Types.ObjectId
        }
    ],
    date: {
        type: Date
    },
    seen: {
        type: Boolean
    }
});

const _CHAT_LOG_SCHEMA_ = new _MONGOOSE_.Schema({
    chat: {
        type: _MONGOOSE_.Schema.Types.ObjectId
    },
    message: [
        {
            content: { type: String },
            from: { type: _MONGOOSE_.Schema.Types.ObjectId },
            to: { type: _MONGOOSE_.Schema.Types.ObjectId },
            date: { type: Date }
        }
    ]
});

const _CHAT_ = _MONGOOSE_.model("chat", _CHAT_SCHEMA_);
module.exports = _CHAT_;

const _CHAT_LOG_ = _MONGOOSE_.model("chatLog", _CHAT_LOG_SCHEMA_);
module.exports = _CHAT_LOG_;