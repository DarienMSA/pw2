const _USER_BADGES_ = require("../models/userBadgesSchema");

exports.userBadges_getall = async (req, res) => {
    try {
        const data = await _USER_BADGES_.find();
        res.send(data);
    } catch (error) {
        res.send(error);
        console.error(error);
    }

}

exports.userBadges_getUserGameBadges = async (req, res) => {
    try {
        const { idUser, idGame } = req.params;
        const data = await _USER_BADGES_.find({ userId: idUser, gameId: idGame }).populate('badges');
        if (data) {
            res.send(data);
        } else {
            res.send({
                message: "No se ha encontrado las medallas del usuario del juego seleccionado.",
                code: "UBE00"
            })
            console.error(`message: "No se ha encontrado las medallas del usuario del juego seleccionado.",
            code: "UBE00"`)
        }
    } catch (error) {
        res.send(error);
        console.error(error);
    }
}

exports.userBadges_getGameBadges = async (req, res) => {
    try {
        const { idGame } = req.params;
        const data = await _USER_BADGES_.find({ gameId: idGame }).populate('badges userId');
        if (data) {
            res.send(data);
        } else {
            res.send({
                message: "No se ha encontrado las medallas del juego seleccionado.",
                code: "UBE01"
            })
            console.error(`message: "No se ha encontrado las medallas del usuario del juego seleccionado.",
            code: "UBE00"`)
        }
    } catch (error) {
        res.send(error);
        console.error(error);
    }
}

exports.userBadges_getUserBadges = async (req, res) => {
    try {
        const { idUser } = req.params;
        const data = await _USER_BADGES_.find({ userId: idUser }).populate('badges gameId');
        if (data) {
            res.send(data);
        } else {
            res.send({
                message: "No se ha encontrado las medallas del usuario.",
                code: "UBE01"
            })
            console.error(`message: "No se ha encontrado las medallas del usuario del juego seleccionado.",
            code: "UBE00"`)
        }
    } catch (error) {
        res.send(error);
        console.error(error);
    }
}


exports.userBadges_create = async (req, res) => {
    try {
        const { body } = req;
        const userBadgesDB = await _USER_BADGES_.find({ userId: body.userId, gameId: body.gameId });
        if (userBadgesDB) {
            let newUserBadges = _USER_BADGES_(body);
            await newUserBadges
                .save()
                .then((newObject) => console.log("Success!", newObject))
                .catch((err) => {
                    console.error(err);
                    res.send({ code: "UBE01-C", message: err });
                })
            res.send(newUserBadges);
        } else {
            res.send({
                message: "Ya hay un medallas inscritas en el juego de ese usuario.",
                code: "UBE00-C"
            })
            console.error(`message: "Ya hay un medallas inscritas en el juego de ese usuario.",
            code: "UBE00-C"`)

        }



    } catch (error) {
        res.send(error);
        console.error(error);
    }
}

exports.userBadges_addBadge = async (req, res) => {
    try {
        const { id, idBadge } = req.params;
        const { body } = req;
        const userBadgesDB = await _USER_BADGES_.findById(id);
        if (userBadgesDB) {
            const data = await _USER_BADGES_.findOneAndUpdate({ _id: id }, { $push: { badges: idBadge } }, { returnOriginal: false }).populate('badges');
            res.send({
                message: "Registro actualizado exitosamente.",
                data //lo mismo a data: data
            })
        } else {
            res.send({
                message: "No se ha encontrado las medallas del usuario del juego seleccionado.",
                code: "UBE00"
            })
            console.error(`message: "No se ha encontrado las medallas del usuario del juego seleccionado.",
            code: "UBE00"`);
        }
    } catch (error) {
        res.send(error)
        console.error(error);
    }
}

exports.userBadges_removeBadge = async (req, res) => {
    try {
        const { id, idBadge } = req.params;
        const { body } = req;
        const userBadgesDB = await _USER_BADGES_.findById(id);
        if (userBadgesDB) {
            const data = await _USER_BADGES_.findOneAndUpdate({ _id: id }, { $pull: { badges: idBadge } }, { returnOriginal: false }).populate('badges');
            res.send({
                message: "Registro actualizado exitosamente.",
                data //lo mismo a data: data
            })
        } else {
            res.send({
                message: "No se ha encontrado las medallas del usuario del juego seleccionado.",
                code: "UBE00"
            })
            console.error(`message: "No se ha encontrado las medallas del usuario del juego seleccionado.",
            code: "UBE00"`);
        }
    } catch (error) {
        res.send(error)
        console.error(error);
    }
}

exports.userBadges_delete = async (req, res) => {
    try {
        const { id } = req.params;
        const chatLogDB = await _USER_BADGES_.findById(id);
        if (chatLogDB) {
            await _USER_BADGES_.deleteOne({ _id: id });

            res.send({ message: "Registro eliminado exitosamente" });
        } else {
            res.send({
                message: "No se ha encontrado las medallas del usuario del juego seleccionado.",
                code: "UBE00"
            })
            console.error(`message: "No se ha encontrado las medallas del usuario del juego seleccionado.",
            code: "UBE00"`);
        }
    } catch (error) {
        res.send(error)
        console.error(error);
    }

}