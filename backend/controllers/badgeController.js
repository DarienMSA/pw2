const _BADGE_ = require("../models/badgeSchema");

exports.badge_getall = async (req, res) => {
    try {
        const data = await _BADGE_.find();
        res.send(data);
    } catch (error) {
        res.send(error);
    }

}

exports.badge_getOne = async (req, res) => {
    try {
        const { id } = req.params;
        const data = await _BADGE_.findById(id);
        if (data) {
            res.send(data);
        } else {
            res.send({
                message: "No se ha encontrado la medalla.",
                code: "BE00"
            })
        }
    } catch (error) {
        res.send(error);
    }
}

exports.badge_create = async (req, res) => {
    try {
        const { body } = req;
        if (body.name.length <= 1 || body.name.length >= 31) {
            res.send({
                message: "El nombre de la medalla necesita ser entre 0 a 30 caracteres.",
                code: "BE00-C"
            })
        } else if (body.desc.length <= 1 || body.desc.length >= 101) {
            res.send({
                message: "La descripción de la medalla necesita ser entre 0 a 100 caracteres.",
                code: "BE01-C"
            })
        } else if (body.image == "") {
            res.send({
                message: "La medalla necesita tener una imagen.",
                code: "BE02-C"
            })
        }
        else {
            let newBadge = _BADGE_(body);
            await newBadge
                .save()
                .then((newObject) => console.log("Success!", newObject))
                .catch((err) => {
                    console.log("Oops!!", err);
                    res.send({ code: "BE03-C", message: "Ya se ha registrado una medalla con ese nombre." });
                })
            res.send(newBadge);
        }
    } catch (error) {
        res.send(error);
    }
}

exports.badge_update = async (req, res) => {
    try {
        const { id } = req.params;
        const { body } = req;
        const badgeDB = await _BADGE_.findById(id);

        if (body.name.length <= 1 || body.name.length >= 31) {
            res.send({
                message: "El nombre de la medalla necesita ser entre 0 a 30 caracteres.",
                code: "BE00-C"
            })
        } else if (body.desc.length <= 1 || body.desc.length >= 101) {
            res.send({
                message: "La descripción de la medalla necesita ser entre 0 a 100 caracteres.",
                code: "BE01-C"
            })
        } else if (body.image == "") {
            res.send({
                message: "La medalla necesita tener una imagen.",
                code: "BE02-C"
            })
        } else if (badgeDB) {
            const data = await _BADGE_.findOneAndUpdate({ _id: id }, body, { returnOriginal: false });
            res.send({
                message: "Registro actualizado exitosamente.",
                data //lo mismo a data: data
            })
        }
        else {
            res.send({
                message: "No se ha encontrado la medalla.",
                code: "BE00"
            })
        }
    } catch (error) {
        res.send(error)
    }
}

exports.badge_delete = async (req, res) => {
    try {
        const { id } = req.params;
        const badgeDB = await _BADGE_.findById(id);
        if (badgeDB) {
            await _BADGE_.deleteOne({ _id: id });

            res.send({ message: "Registro eliminado exitosamente" });
        } else {
            res.send({
                message: "No se ha encontrado la medalla.",
                code: "BE00"
            })
        }
    } catch (error) {
        res.send(error)
    }

}