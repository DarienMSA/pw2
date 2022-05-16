const _NOTIFICATION_ = require("../models/notificationSchema");
const _USER_ = require("../models/userSchema");

exports.notification_getall = async (req, res) => {
    try {
        const data = await _NOTIFICATION_.find();
        res.send(data);
    } catch (error) {
        res.send(error);
        console.error(error);
    }

}

exports.notification_getUserNotifs = async (req, res) => {
    try {
        const { id } = req.params;
        const data = await _NOTIFICATION_.find({ user: id }).populate('fromUser fromGame user').sort({ _id: -1 });
        console.log(data)
        res.send(data);
    } catch (error) {
        res.send(error);
        console.error(error);
    }
}

exports.notification_getUserNotifsActive = async (req, res) => {
    try {
        const { id } = req.params;
        const data = await _NOTIFICATION_.find({ user: id, active: true });
        res.send({ length: data.length });
    } catch (error) {
        res.send(error);
        console.error(error);
    }
}


exports.notification_create = async (req, res) => {
    try {
        const { body } = req;
        if (validateOrigin(body.origin)) {
            const userDB = await _USER_.findById(body.user)
            if (userDB) {
                let newNotLog = _NOTIFICATION_(body);
                await newNotLog
                    .save()
                    .then((newObject) => console.log("Success!", newObject))
                    .catch((err) => {
                        console.error(err);
                        res.send({ code: "NE01-C", message: err });
                    })
                res.send(newNotLog);
            } else {
                res.send({
                    message: "No existe el usuario ligado a las notificaciones.",
                    code: "NE03-C"
                })
                console.error(`message: "No existe el usuario ligado a las notificaciones.",
                code: "NE03-C"`);
            }

        }
        else {
            res.send({
                message: "Origen de la notificación errónea.",
                code: "NE02-C"
            })
            console.error(`message: "Origen de la notificación errónea.",
            code: "NE02-C"`);
        }
    } catch (error) {
        res.send(error);
        console.error(error);
    }
}

exports.notification_updateNotification = async (req, res) => {
    try {
        const { id } = req.params;
        const data = await _NOTIFICATION_.updateMany({ user: id }, { $set: { active: false } }, { returnOriginal: false });
        res.send(data);
    } catch (error) {
        console.log(error)
        res.send(error)
    }
}

exports.notification_addNotification = async (req, res) => {
    try {
        const { id } = req.params;
        const { body } = req;

        if (validateOrigin(body.notifications.origin)) {
            const userDB = await _USER_.findById(body.user)
            if (userDB) {
                const data = await _NOTIFICATION_.findOneAndUpdate({ user: id }, { body }, { returnOriginal: false }).populate('notifications.from');
                res.send(data);
            } else {
                res.send({
                    message: "No existe el usuario ligado a las notificaciones.",
                    code: "NE03-C"
                })
                console.error(`message: "No existe el usuario ligado a las notificaciones.",
                code: "NE03-C"`);
            }

        }
        else {
            res.send({
                message: "Origen de la notificación errónea.",
                code: "NE02-C"
            })
            console.error(`message: "Origen de la notificación errónea.",
            code: "NE02-C"`);
        }
    } catch (error) {
        res.send(error)
    }
}

exports.notification_delete = async (req, res) => {
    try {
        const { id } = req.params;
        const notificationDB = await _NOTIFICATION_.findById(id);
        if (notificationDB) {
            await _NOTIFICATION_.deleteOne({ _id: id });

            res.send({ message: "Registro eliminado exitosamente" });
        } else {
            res.send({
                message: "No se ha encontrado las notificaciones del usuario.",
                code: "NE00"
            })
            console.error(`message: "No se ha encontrado las notificaciones del usuario.",
            code: "NE00"`);
        }
    } catch (error) {
        res.send(error)
        console.error(error);
    }

}

const validateOrigin = (origin) => {
    switch (origin) {
        case "comment":
            return true;
            break;
        case "like":
            return true;
            break;
        case "welcome":
            return true;
            break;
        default:
            return false;
    }
};