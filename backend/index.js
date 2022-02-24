const _BODYPARSER_ = require("body-parser");
const _EXPRESS_ = require("express");
const _APP_ = _EXPRESS_();
const _PORT_ = 5000;
require('./models/connection')

/** requires de las rutas */
const _USER_ROUTE_ = require('./routes/userRoutes');
const _BADGE_ROUTE_ = require('./routes/badgeRoutes');
const _CHAT_ROUTE_ = require('./routes/chatRoutes');
const _CHAT_LOG_ROUTE_ = require('./routes/chatLogRoutes');
const _COMMENT_ROUTE_ = require('./routes/commentRoutes');
const _REVIEW_ROUTE_ = require('./routes/reviewRoutes');
const _GAME_ROUTE_ = require('./routes/gameRoutes');
const _GENRE_ROUTE_ = require('./routes/genreRoutes');
const _NOTIFICATION_ROUTE_ = require('./routes/notificationRoutes');
const _USER_BADGES_ROUTE = require('./routes/userBadgesRoutes');

_APP_.use(_BODYPARSER_.json());

_APP_.use('/api', _USER_ROUTE_);
_APP_.use('/api', _BADGE_ROUTE_);
_APP_.use('/api', _CHAT_ROUTE_);
_APP_.use('/api', _CHAT_LOG_ROUTE_);
_APP_.use('/api', _COMMENT_ROUTE_);
_APP_.use('/api', _REVIEW_ROUTE_);
_APP_.use('/api', _GAME_ROUTE_);
_APP_.use('/api', _GENRE_ROUTE_);
_APP_.use('/api', _NOTIFICATION_ROUTE_);
_APP_.use('/api', _USER_BADGES_ROUTE);

_APP_.listen(_PORT_, () => {
    console.log("La aplicación está escuchando al puerto " + _PORT_);
});
