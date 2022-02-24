const _EXPRESS_ = require('express');
const _ROUTER_ = _EXPRESS_.Router();

const _GENRE_ROUTER_ = require('../controllers/genreController');

_ROUTER_.get("/genre", _GENRE_ROUTER_.genre_getall);
_ROUTER_.get("/genre/:id", _GENRE_ROUTER_.genre_getOne);
_ROUTER_.post("/genre", _GENRE_ROUTER_.genre_create);
_ROUTER_.put("/genre/:id", _GENRE_ROUTER_.genre_update);
_ROUTER_.delete("/genre/:id", _GENRE_ROUTER_.genre_delete);


module.exports = _ROUTER_;