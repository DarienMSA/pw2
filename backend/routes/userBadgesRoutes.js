const _EXPRESS_ = require('express');
const _ROUTER_ = _EXPRESS_.Router();

const _USER_BADGES_ROUTER_ = require('../controllers/userBadgesController');

_ROUTER_.get("/userBadges", _USER_BADGES_ROUTER_.userBadges_getall);
_ROUTER_.get("/userBadges/user/:idUser/game/:idGame", _USER_BADGES_ROUTER_.userBadges_getUserGameBadges);
_ROUTER_.get("/userBadges/game/:idGame", _USER_BADGES_ROUTER_.userBadges_getGameBadges);
_ROUTER_.get("/userBadges/user/:idUser", _USER_BADGES_ROUTER_.userBadges_getUserBadges);

_ROUTER_.post("/userBadges", _USER_BADGES_ROUTER_.userBadges_create);

_ROUTER_.put("/userBadges/:id/addBadge/:idBadge", _USER_BADGES_ROUTER_.userBadges_addBadge);
_ROUTER_.put("/userBadges/:id/removeBadge/:idBadge", _USER_BADGES_ROUTER_.userBadges_removeBadge);

_ROUTER_.delete("/userBadges/:id", _USER_BADGES_ROUTER_.userBadges_delete);


module.exports = _ROUTER_;