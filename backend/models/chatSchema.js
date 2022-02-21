const _MONGOOSE_ = require('mongoose');

const _CHAT_SCHEMA_ = new _MONGOOSE_.Schema({
    members: [
        {
            type: _MONGOOSE_.Schema.Types.ObjectId
        }
    ],
    lastMessageDate: {
        type: Date
    },
    seen: {
        type: Boolean
    }
});



const _CHAT_ = _MONGOOSE_.model("chat", _CHAT_SCHEMA_);
module.exports = _CHAT_;

