const _EXPRESS_ = require('express');
const _ROUTER_ = _EXPRESS_.Router();

const _USER_ROUTER_ = require('../controllers/userController');

_ROUTER_.get("/user", _USER_ROUTER_.user_getall);
_ROUTER_.get("/user/:id", _USER_ROUTER_.user_getOne);
_ROUTER_.get("/user/:email/:password", _USER_ROUTER_.user_logIn);
_ROUTER_.post("/user", _USER_ROUTER_.user_create);
_ROUTER_.put("/user/:id", _USER_ROUTER_.user_update);
_ROUTER_.delete("/user/:id", _USER_ROUTER_.user_delete);

module.exports = _ROUTER_;