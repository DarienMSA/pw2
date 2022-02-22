const _EXPRESS_ = require('express');
const _ROUTER_ = _EXPRESS_.Router();

const _COMMENT_ROUTER_ = require('../controllers/commentController');

_ROUTER_.get("/comment", _COMMENT_ROUTER_.comment_getall);
_ROUTER_.get("/comment/:id", _COMMENT_ROUTER_.comment_getOne);
_ROUTER_.post("/comment", _COMMENT_ROUTER_.comment_create);
_ROUTER_.put("/comment/:id", _COMMENT_ROUTER_.comment_update);
_ROUTER_.delete("/comment/:id/:idUser", _COMMENT_ROUTER_.comment_delete);


module.exports = _ROUTER_;