const _GENRE_ = require("../models/genreSchema");

exports.genre_getall = async (req, res) => {
    try {
        const data = await _GENRE_.find();
        res.send(data);
    } catch (error) {
        res.send(error);
        console.error(error);
    }

}

exports.genre_getOne = async (req, res) => {
    try {
        const { id } = req.params;
        const data = await _GENRE_.findById(id);
        if (data) {
            res.send(data);
        } else {
            res.send({
                message: "No se ha encontrado el género.",
                code: "GNE00"
            })
            console.error(`message: "No se ha encontrado el género.",
            code: "GNE00"`);
        }
    } catch (error) {
        res.send(error);
    }
}

exports.genre_create = async (req, res) => {
    try {
        const { body } = req;
        if (body.name.length < 0 || body.name.length > 50) {
            res.send({
                message: "El nombre del género necesita ser entre 0 a 50 caracteres.",
                code: "GNE00-C"
            })
            console.error(`message: "El nombre del género necesita ser entre 0 a 50 caracteres.",
            code: "GNE00-C"`);
        } else if (body.desc.length <= 1 || body.desc.length >= 101) {
            res.send({
                message: "La descripción del género necesita ser entre 0 a 100 caracteres.",
                code: "GNE01-C"
            })
            console.error(`message: "La descripción del género necesita ser entre 0 a 100 caracteres.",
            code: "GNE01-C"`);
        }
        else {
            const genreDB = await _GENRE_.find({ name: body.name });
            if (genreDB.length == 0) {
                let newGenre = _GENRE_(body);
                await newGenre
                    .save()
                    .then((newObject) => console.log("Success!", newObject))
                    .catch((err) => {
                        console.error(err);
                        res.send({ code: "GNE03-C", err });
                    })
                res.send(newGenre);
            } else {
                res.send({
                    message: "Ya existe un género con ese nombre.",
                    code: "GNE01"
                })
                console.error(`message: "Ya existe un género con ese nombre.",
                code: "GNE01"`);
            }

        }
    } catch (error) {
        res.send(error);
        console.error(error);
    }
}

exports.genre_update = async (req, res) => {
    try {
        const { id } = req.params;
        const { body } = req;
        const genreDB = await _GENRE_.findById(id);

        if (body.name.length < 0 || body.name.length > 50) {
            res.send({
                message: "El nombre del género necesita ser entre 0 a 50 caracteres.",
                code: "GNE00-C"
            })
            console.error(`message: "El nombre del género necesita ser entre 0 a 50 caracteres.",
            code: "GNE00-C"`);
        } else if (body.desc.length <= 1 || body.desc.length >= 101) {
            res.send({
                message: "La descripción del género necesita ser entre 0 a 100 caracteres.",
                code: "GNE01-C"
            })
            console.error(`message: "La descripción del género necesita ser entre 0 a 100 caracteres.",
            code: "GNE01-C"`);
        } else if (genreDB) {
            const genreNameDB = await _GENRE_.find(genreDB.name);
            if (genreNameDB._id == id) {
                const data = await _GENRE_.findOneAndUpdate({ _id: id }, body, { returnOriginal: false });
                res.send({
                    message: "Registro actualizado exitosamente.",
                    data //lo mismo a data: data
                })
            } else {
                res.send({
                    message: "Ya existe un género con ese nombre.",
                    code: "GNE01"
                })
                console.error(`message: "Ya existe un género con ese nombre.",
                code: "GNE01"`);
            }

        }
        else {
            res.send({
                message: "No se ha encontrado el género.",
                code: "GNE00"
            })
            console.error(`message: "No se ha encontrado el género.",
            code: "GNE00"`);
        }
    } catch (error) {
        res.send(error)

        console.error(error);
    }
}

exports.genre_delete = async (req, res) => {
    try {
        const { id } = req.params;
        const genreDB = await _GENRE_.findById(id);
        if (genreDB) {
            await _GENRE_.deleteOne({ _id: id });

            res.send({ message: "Registro eliminado exitosamente" });
        } else {
            res.send({
                message: "No se ha encontrado el género.",
                code: "GNE00"
            })
            console.error(`message: "No se ha encontrado el género.",
            code: "GNE00"`);
        }
    } catch (error) {
        res.send(error)
        console.error(error);
    }

}