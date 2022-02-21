const _EXPRESS_ = require('express');
const _ROUTER_ = _EXPRESS_.Router();

const _BADGE_ROUTER_ = require('../controllers/badgeController');

_ROUTER_.get("/badge", _BADGE_ROUTER_.badge_getall);
_ROUTER_.get("/badge/:id", _BADGE_ROUTER_.badge_getOne);
_ROUTER_.post("/badge", _BADGE_ROUTER_.badge_create);
_ROUTER_.put("/badge/:id", _BADGE_ROUTER_.badge_update);
_ROUTER_.delete("/badge/:id", _BADGE_ROUTER_.badge_delete);


module.exports = _ROUTER_;