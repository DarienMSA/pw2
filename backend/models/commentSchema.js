const _MONGOOSE_ = require('mongoose');

const _COMMENT_SCHEMA_ = new _MONGOOSE_.Schema({
    review: {
        type: _MONGOOSE_.Schema.Types.ObjectId,
        required: true
    },
    comment:
        [
            {
                content: {
                    type: String,
                    maxlength: 50
                },
                date: {
                    type: Date
                },
                user: {
                    type: _MONGOOSE_.Schema.Types.ObjectId
                }
            }
        ]


});


const _COMMENT_ = _MONGOOSE_.model("comment", _COMMENT_SCHEMA_);
module.exports = _COMMENT_;