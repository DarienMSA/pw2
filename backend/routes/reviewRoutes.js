const _EXPRESS_ = require('express');
const _ROUTER_ = _EXPRESS_.Router();

const _REVIEW_ROUTER_ = require('../controllers/reviewController');

_ROUTER_.get("/review", _REVIEW_ROUTER_.review_getall);
_ROUTER_.get("/review/:id", _REVIEW_ROUTER_.review_getOne);
_ROUTER_.get("/review/user/:id", _REVIEW_ROUTER_.review_getUserReviews);
_ROUTER_.get("/review/game/:id", _REVIEW_ROUTER_.review_getGameReviews);
_ROUTER_.get("/review/game/score/:id", _REVIEW_ROUTER_.review_getGameStarScores);
_ROUTER_.get("/review/:idGame/:idUser", _REVIEW_ROUTER_.review_getUserGameReview);
_ROUTER_.get("/review/searchLikeUser/:id/:idUser", _REVIEW_ROUTER_.review_getUserHasLike);

_ROUTER_.post("/review", _REVIEW_ROUTER_.review_create);

_ROUTER_.put("/review/:id", _REVIEW_ROUTER_.review_update);
_ROUTER_.put("/review/:id/upvote/:idUser", _REVIEW_ROUTER_.review_upvote);
_ROUTER_.put("/review/:id/downvote/:idUser", _REVIEW_ROUTER_.review_downvote);

_ROUTER_.delete("/review/:id", _REVIEW_ROUTER_.review_delete);


module.exports = _ROUTER_;