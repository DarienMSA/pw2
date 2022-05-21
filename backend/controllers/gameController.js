const _GAME_ = require("../models/gameSchema");

exports.game_getall = async (req, res) => {
    try {
        const data = await _GAME_.find().sort({ name: 1 }).populate("genres");
        res.send(data);
    } catch (error) {
        res.send(error);
        console.error(error)
    }

}

exports.game_getall_sorted = async (req, res) => {
    try {
        const { sortBy } = req.params;
        let data;
        console.log(data)
        if (sortBy === "name")
            data = await _GAME_.find().sort({ [sortBy]: 1 }).populate("genres");
        else if (sortBy === "activeUsersLength" || sortBy === "reviewsLength" || sortBy === "score")
            data = await _GAME_.find().sort({ [sortBy]: -1 }).populate("genres").limit(10);

        if (data !== undefined) {
            res.send(data);
        } else {
            res.send({
                message: "Ordenamiento no disponible.",
                code: "GE01"
            })
            console.error(`message: "Ordenamiento no disponible.",
            code: "GE01"`)
        }

    } catch (error) {
        res.send(error);
        console.error(error)
    }

}

exports.game_getByName = async (req, res) => {
    try {
        const { value } = req.params;
        const data = await _GAME_.find({ name: { $regex: '.*' + value + '.*', $options: '-i' } }).populate("genres");
        console.log("data", data)
        res.send(data);

    } catch (error) {
        res.send(error);
        console.error(error)
    }
}



exports.game_getOne = async (req, res) => {
    try {
        const { id } = req.params;
        const data = await _GAME_.findById(id).populate("genres activeUsers");
        if (data) {
            res.send(data);
        } else {
            res.send({
                message: "No se ha encontrado el juego.",
                code: "GE00"
            })
            console.error(`message: "No se ha encontrado el juego.",
            code: "GE00"`)
        }
    } catch (error) {
        res.send(error);
        console.error(error)
    }
}


exports.game_isUserActiveInGame = async (req, res) => {
    try {
        const { id, idUser } = req.params;
        const data = await _GAME_.findOne({ $and: [{ _id: id }, { activeUsers: idUser }] });
        if (data) {
            res.send(true);
        } else {
            res.send(false);
        }
    } catch (error) {
        res.send(error);
        console.error(error)
    }
}

exports.game_GetUserActiveGames = async (req, res) => {
    try {
        const { idUser } = req.params;
        const data = await _GAME_.find({ activeUsers: idUser });

        res.send(data);

    } catch (error) {
        res.send(error);
        console.error(error)
    }
}


exports.game_getGamesByGenre = async (req, res) => {
    try {
        const { idGenre } = req.params;
        const data = await _GAME_.find({ genres: idGenre }).populate("genres");
        if (data.length != 0) {
            res.send(data);
        } else {
            res.send({
                message: "No hay juegos de ese género.",
                code: "GE00"
            })
            console.error(`message: "No se ha encontrado el juego.",
            code: "GE00"`)
        }
    } catch (error) {
        res.send(error);
        console.error(error)
    }
}


exports.game_create = async (req, res) => {
    try {
        const { body } = req;
        const gameDB = await _GAME_.find({ name: body.name });
        if (gameDB.length != 0) {
            res.send({
                message: "Ya hay un videojuego con ese nombre.",
                code: "GE04-C"
            })
            console.error(`message: "Ya hay un videojuego con ese nombre.",
            code: "GE04-C"`)
        }
        else if (body.name.length < 0) {
            res.send({
                message: "Se necesita introducir el nombre del videojuego.",
                code: "GE00-C"
            })
            console.error(`message: "Se necesita introducir el nombre del videojuego.",
            code: "GE00-C"`)
        } else if (body.synopsis.length < 0 || body.synopsis.length > 1200) {
            res.send({
                message: "La sinopsis del videojuego necesita ser entre 0 a 1200 caracteres.",
                code: "GE01-C"
            })
            console.error(`message: "La sinopsis del videojuego necesita ser entre 0 a 1200 caracteres.",
            code: "GE01-C"`)
        } else if (body.score < 0 || body.score > 5) {
            res.send({
                message: "El puntaje del videojuego necesita estar entre 0 y 5.",
                code: "GE02-C"
            })
            console.error(`message: "El puntaje del videojuego necesita estar entre 0 y 5.",
            code: "GE02-C"`)
        }
        else if (body.image == "") {
            res.send({
                message: "El videojuego necesita tener una imagen.",
                code: "GE05-C"
            })
            console.error(`message: "El videojuego necesita tener una imagen.",
            code: "GE05-C"`)
        }
        else {
            let newGame = _GAME_(body);
            await newGame
                .save()
                .then((newObject) => console.log("Success!", newObject))
                .catch((err) => {
                    console.error(err);
                    res.send({ code: "GE03-C", message: err });
                })
            res.send(newGame);
        }
    } catch (error) {
        res.send(error);
        console.error(error)
    }
}

exports.game_update = async (req, res) => {
    try {
        const { id } = req.params;
        const { body } = req;
        const gameDB = await _GAME_.find({ name: body.name });

        if (body.name.length < 0) {
            res.send({
                message: "Se necesita introducir el nombre del videojuego.",
                code: "GE00-C"
            })
            console.error(`message: "Se necesita introducir el nombre del videojuego.",
            code: "GE00-C"`)
        } else if (body.synopsis.length < 0 || body.synopsis.length > 1200) {
            res.send({
                message: "La sinopsis del videojuego necesita ser entre 0 a 1200 caracteres.",
                code: "GE01-C"
            })
            console.error(`message: "La sinopsis del videojuego necesita ser entre 0 a 1200 caracteres.",
            code: "GE01-C"`)
        } else if (body.score < 0 || body.score > 5) {
            res.send({
                message: "El puntaje del videojuego necesita estar entre 0 y 5.",
                code: "GE02-C"
            })
            console.error(`message: "El puntaje del videojuego necesita estar entre 0 y 5.",
            code: "GE02-C"`)
        }
        else if (body.image == "") {
            res.send({
                message: "El videojuego necesita tener una imagen.",
                code: "GE05-C"
            })
            console.error(`message: "El videojuego necesita tener una imagen.",
            code: "GE05-C"`)
        } else if (gameDB.length != 0) {
            if (gameDB[0]._id.toString() != id) {
                res.send({
                    message: "Ya hay un videojuego con ese nombre.",
                    code: "GE04-C"
                })
                console.error(`message: "Ya hay un videojuego con ese nombre.",
                code: "GE04-C"`)
            } else {
                const data = await _GAME_.findOneAndUpdate({ _id: id }, body, { returnOriginal: false });
                res.send({
                    message: "Registro actualizado exitosamente.",
                    data //lo mismo a data: data
                })
            }

        }
        else {
            const data = await _GAME_.findOneAndUpdate({ _id: id }, body, { returnOriginal: false });
            res.send({
                message: "Registro actualizado exitosamente.",
                data //lo mismo a data: data
            })
        }
    } catch (error) {
        res.send(error)
        console.error(error)
    }
}

exports.game_add_active_user = async (req, res) => {
    try {
        const { id, idUser } = req.params;
        const { body } = req;
        const gameDB = await _GAME_.findById(id);
        if (gameDB) {
            const data = await _GAME_.findOneAndUpdate(
                { _id: id },
                {
                    $push: { activeUsers: idUser },
                    $inc: { activeUsersLength: 1 }
                },
                { returnOriginal: false }).populate("genres activeUsers");
            res.send({
                message: "Registro actualizado exitosamente.",
                data //lo mismo a data: data
            })
        }
        else {
            res.send({
                message: "No se ha encontrado el videojuego.",
                code: "GE00"
            })
            console.error(`message: "No se ha encontrado el videojuego.",
            code: "GE00"`)
        }
    } catch (error) {
        res.send(error)
        console.error(error)
    }
}

exports.game_remove_active_user = async (req, res) => {
    try {
        const { id, idUser } = req.params;
        const { body } = req;
        const gameDB = await _GAME_.findById(id);
        if (gameDB) {
            const data = await _GAME_.findOneAndUpdate(
                { _id: id },
                {
                    $pull: { activeUsers: idUser },
                    $inc: { activeUsersLength: -1 }
                },
                { returnOriginal: false }).populate("genres activeUsers");
            res.send({
                message: "Registro actualizado exitosamente.",
                data //lo mismo a data: data
            })
        }
        else {
            res.send({
                message: "No se ha encontrado el videojuego.",
                code: "GE00"
            })
            console.error(`message: "No se ha encontrado el videojuego.",
            code: "GE00"`)
        }
    } catch (error) {
        res.send(error)
        console.error(error)
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
            console.error(`message: "No se ha encontrado el videojuego.",
            code: "GE00"`)
        }
    } catch (error) {
        res.send(error)
        console.error(error)
    }

}