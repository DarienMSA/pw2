const _EXPRESS_ = require('express');
const _ROUTER_ = _EXPRESS_.Router();

const _COMMENT_ROUTER_ = require('../controllers/commentController');

_ROUTER_.get("/comment", _COMMENT_ROUTER_.comment_getall);
_ROUTER_.get("/comment/:id", _COMMENT_ROUTER_.comment_getOne);
_ROUTER_.post("/comment", _COMMENT_ROUTER_.comment_create);
_ROUTER_.put("/comment/:id", _COMMENT_ROUTER_.comment_update);
_ROUTER_.put("/comment/add/:id", _COMMENT_ROUTER_.comment_add);
_ROUTER_.put("/comment/:id/:idComment", _COMMENT_ROUTER_.comment_remove);
_ROUTER_.delete("/comment/:id", _COMMENT_ROUTER_.comment_delete);


module.exports = _ROUTER_;