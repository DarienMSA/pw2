const _MONGOOSE_ = require('mongoose');

const _COMMENT_SCHEMA_ = new _MONGOOSE_.Schema({
    review: {
        type: _MONGOOSE_.Schema.Types.ObjectId,
        required: true,
        ref: 'review'
    },
    comment:
        [
            {
                content: {
                    type: String,
                    maxlength: 300
                },
                date: {
                    type: Date
                },
                user: {
                    type: _MONGOOSE_.Schema.Types.ObjectId,
                    ref: 'user'
                }
            }
        ]


});


const _COMMENT_ = _MONGOOSE_.model("comment", _COMMENT_SCHEMA_);
module.exports = _COMMENT_;