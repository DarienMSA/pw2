const _BODYPARSER_ = require("body-parser");
const _EXPRESS_ = require("express");
const _APP_ = _EXPRESS_();
const _PORT_ = 5000;
require('./models/connection')

/** requires de las rutas */
const _USER_ROUTE_ = require('./routes/userRoutes');
const _BADGE_ROUTE_ = require('./routes/badgeRoutes');
const _CHAT_ROUTE_ = require('./routes/chatRoutes');

_APP_.use(_BODYPARSER_.json());

_APP_.use('/api', _USER_ROUTE_);
_APP_.use('/api', _BADGE_ROUTE_);
_APP_.use('/api', _CHAT_ROUTE_);

_APP_.listen(_PORT_, () => {
    console.log("La aplicación está escuchando al puerto " + _PORT_);
});
