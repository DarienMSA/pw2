const _EXPRESS_ = require('express');
const _ROUTER_ = _EXPRESS_.Router();

const _GAME_ROUTER_ = require('../controllers/gameController');

_ROUTER_.get("/game", _GAME_ROUTER_.game_getall);
_ROUTER_.get("/game/:id", _GAME_ROUTER_.game_getOne);
_ROUTER_.get("/game/genre/:idGenre", _GAME_ROUTER_.game_getGamesByGenre);

_ROUTER_.post("/game", _GAME_ROUTER_.game_create);

_ROUTER_.put("/game/:id", _GAME_ROUTER_.game_update);
_ROUTER_.put("/game/:id/addUser/:idUser", _GAME_ROUTER_.game_add_active_user);
_ROUTER_.put("/game/:id/removeUser/:idUser", _GAME_ROUTER_.game_remove_active_user);

_ROUTER_.delete("/game/:id", _GAME_ROUTER_.game_delete);


module.exports = _ROUTER_;