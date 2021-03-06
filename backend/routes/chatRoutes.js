const _EXPRESS_ = require('express');
const _ROUTER_ = _EXPRESS_.Router();

const _CHAT_ROUTER_ = require('../controllers/chatController');

_ROUTER_.get("/chat", _CHAT_ROUTER_.chat_getall);
_ROUTER_.get("/chat/:id", _CHAT_ROUTER_.chat_getOne);
_ROUTER_.get("/chat/user/:id", _CHAT_ROUTER_.chat_getUserChats);
_ROUTER_.get("/chat/user/hasSeen/:id", _CHAT_ROUTER_.chat_hasUserSeenMessage);
_ROUTER_.get("/chat/user/:id1/:id2", _CHAT_ROUTER_.chat_getUsersChats);

_ROUTER_.post("/chat", _CHAT_ROUTER_.chat_create);

_ROUTER_.put("/chat/:id", _CHAT_ROUTER_.chat_update);
_ROUTER_.put("/chat/:id/:seen", _CHAT_ROUTER_.chat_setSeen);

_ROUTER_.delete("/chat/:id", _CHAT_ROUTER_.chat_delete);


module.exports = _ROUTER_;