const _EXPRESS_ = require('express');
const _ROUTER_ = _EXPRESS_.Router();

const _USER_ROUTER_ = require('../controllers/userController');

_ROUTER_.get("/user", _USER_ROUTER_.user_getall);
_ROUTER_.post("/user", _USER_ROUTER_.user_create);

module.exports = _ROUTER_;