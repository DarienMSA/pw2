const _MONGOOSE_ = require('mongoose');

const _CHAT_LOG_SCHEMA_ = new _MONGOOSE_.Schema({
    chat: {
        type: _MONGOOSE_.Schema.Types.ObjectId,
        ref: 'chat'
    },
    message: [
        {
            content: { type: String, required: true },
            from: { type: _MONGOOSE_.Schema.Types.ObjectId, ref: 'user' },
            to: { type: _MONGOOSE_.Schema.Types.ObjectId, ref: 'user' },
            messageDate: { type: String }
        }
    ]
});

const _CHAT_LOG_ = _MONGOOSE_.model("chatLog", _CHAT_LOG_SCHEMA_);
module.exports = _CHAT_LOG_;