const _EXPRESS_ = require('express');
const _ROUTER_ = _EXPRESS_.Router();

const _CHAT_LOG_ROUTER_ = require('../controllers/chatLogController');

_ROUTER_.get("/chatLog", _CHAT_LOG_ROUTER_.chatLog_getall);
_ROUTER_.get("/chatLog/:id", _CHAT_LOG_ROUTER_.chatLog_getOne);
_ROUTER_.post("/chatLog", _CHAT_LOG_ROUTER_.chatLog_create);
_ROUTER_.put("/chatLog/:id", _CHAT_LOG_ROUTER_.chatLog_update);
_ROUTER_.delete("/chatLog/:id", _CHAT_LOG_ROUTER_.chatLog_delete);

module.exports = _ROUTER_;