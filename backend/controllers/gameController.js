const _GAME_ = require("../models/gameSchema");

exports.game_getall = async (req, res) => {
    try {
        const data = await _GAME_.find();
        res.send(data);
    } catch (error) {
        res.send(error);
    }

}

exports.game_getOne = async (req, res) => {
    try {
        const { id } = req.params;
        const data = await _GAME_.findById(id);
        if (data) {
            res.send(data);
        } else {
            res.send({
                message: "No se ha encontrado el juego.",
                code: "GE00"
            })
        }
    } catch (error) {
        res.send(error);
    }
}

exports.game_create = async (req, res) => {
    try {
        const { body } = req;
        const gameDB = await _GAME_.find({ name: body.name });
        if (gameDB) {
            res.send({
                message: "Ya hay un videojuego con ese nombre.",
                code: "GE04-C"
            })
        }
        else if (body.name.length < 0) {
            res.send({
                message: "Se necesita introducir el nombre del videojuego.",
                code: "GE00-C"
            })
        } else if (body.synopsis.length < 0 || body.synopsis.length > 300) {
            res.send({
                message: "La sinopsis del videojuego necesita ser entre 0 a 300 caracteres.",
                code: "GE01-C"
            })
        } else if (body.score < 0 || body.score > 5) {
            res.send({
                message: "El puntaje del videojuego necesita estar entre 0 y 5.",
                code: "GE02-C"
            })
        }
        else if (body.image == "") {
            res.send({
                message: "El videojuego necesita tener una imagen.",
                code: "BE05-C"
            })
        }
        else {
            let newGame = _GAME_(body);
            await newGame
                .save()
                .then((newObject) => console.log("Success!", newObject))
                .catch((err) => {
                    console.log("Oops!!", err);
                    res.send({ code: "GE03-C", message: err });
                })
            res.send(newGame);
        }
    } catch (error) {
        res.send(error);
    }
}

exports.game_update = async (req, res) => {
    try {
        const { id } = req.params;
        const { body } = req;
        const gameDB = await _GAME_.findById(id);

        if (gameDB._id != id) {
            res.send({
                message: "Ya hay un videojuego con ese nombre.",
                code: "GE04-C"
            })
        }
        else if (body.name.length < 0) {
            res.send({
                message: "Se necesita introducir el nombre del videojuego.",
                code: "GE00-C"
            })
        } else if (body.synopsis.length < 0 || body.synopsis.length > 300) {
            res.send({
                message: "La sinopsis del videojuego necesita ser entre 0 a 300 caracteres.",
                code: "GE01-C"
            })
        } else if (body.score < 0 || body.score > 5) {
            res.send({
                message: "El puntaje del videojuego necesita estar entre 0 y 5.",
                code: "GE02-C"
            })
        }
        else if (body.image == "") {
            res.send({
                message: "El videojuego necesita tener una imagen.",
                code: "BE05-C"
            })
        } else if (badgeDB) {
            const data = await _GAME_.findOneAndUpdate({ _id: id }, body, { returnOriginal: false });
            res.send({
                message: "Registro actualizado exitosamente.",
                data //lo mismo a data: data
            })
        }
        else {
            res.send({
                message: "No se ha encontrado el videojuego.",
                code: "BE00"
            })
        }
    } catch (error) {
        res.send(error)
    }
}

exports.game_delete = async (req, res) => {
    try {
        const { id } = req.params;
        const badgeDB = await _GAME_.findById(id);
        if (badgeDB) {
            await _GAME_.deleteOne({ _id: id });

            res.send({ message: "Registro eliminado exitosamente" });
        } else {
            res.send({
                message: "No se ha encontrado el videojuego.",
                code: "GE00"
            })
        }
    } catch (error) {
        res.send(error)
    }

}