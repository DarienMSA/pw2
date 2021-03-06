const _EXPRESS_ = require('express');
const _ROUTER_ = _EXPRESS_.Router();

const _NOTIFICATION_ROUTER_ = require('../controllers/notificationController');

_ROUTER_.get("/notification", _NOTIFICATION_ROUTER_.notification_getall);
_ROUTER_.get("/notification/:id", _NOTIFICATION_ROUTER_.notification_getUserNotifs);
_ROUTER_.get("/notification/active/:id", _NOTIFICATION_ROUTER_.notification_getUserNotifsActive);

_ROUTER_.post("/notification", _NOTIFICATION_ROUTER_.notification_create);

_ROUTER_.put("/notification/:id", _NOTIFICATION_ROUTER_.notification_addNotification);
_ROUTER_.put("/notification/setActive/:id", _NOTIFICATION_ROUTER_.notification_updateNotification);

_ROUTER_.delete("/notification/:id", _NOTIFICATION_ROUTER_.notification_delete);

module.exports = _ROUTER_;