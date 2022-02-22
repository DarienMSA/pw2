const _COMMENT_ = require("../models/commentSchema");
const _REVIEW_ = require("../models/reviewSchema");
const _USER_ = require("../models/userSchema");

exports.comment_getall = async (req, res) => {
    try {
        const data = await _COMMENT_.find();
        res.send(data);
    } catch (error) {
        res.send(error);
    }

}

exports.comment_getOne = async (req, res) => {
    try {
        const { id } = req.params;
        const data = await _COMMENT_.findById(id);
        if (data) {
            res.send(data);
        } else {
            res.send({
                message: "No se ha encontrado el comentario.",
                code: "COME00"
            })
        }
    } catch (error) {
        res.send(error);
    }
}

exports.comment_create = async (req, res) => {
    try {
        const { body } = req;

        const reviewDB = await _REVIEW_.findById(body.review);
        if (reviewDB) {
            const commentDB = await _COMMENT_.find({ review: body.review, user: body.comment.user });
            if (commentDB) {
                res.send({
                    message: "Ya comentaste esta reseña.",
                    code: "COME00-C"
                })
            } else {
                const userDB = await _USER_.findById(body.comment.user);
                if (userDB) {
                    if (body.comment.content <= 0 || body.comment.content >= 301) {
                        res.send({
                            message: "El comentario debe tener un máximo de 300 caracteres.",
                            code: "COME03-C"
                        })
                    } else {
                        let newComment = _COMMENT_(body);
                        await newComment
                            .save()
                            .then((newObject) => console.log("Success!", newObject))
                            .catch((err) => {
                                console.log("Oops!!", err);
                                res.send({ code: "COME04-C", message: err });
                            })
                        res.send(newComment);
                    }
                } else {
                    res.send({
                        message: "Error encontrado al usuario que escribió el comentario.",
                        code: "COME02-C"
                    })
                }
            }
        } else {
            res.send({
                message: "No existe la reseña a la cual se está comentando.",
                code: "COME01"
            })
        }
    } catch (error) {
        res.send(error);
    }
}

exports.comment_update = async (req, res) => {
    try {
        const { id } = req.params;
        const { body } = req;
        const reviewDB = await _REVIEW_.findById(body.review);
        if (reviewDB) {
            const commentDB = await _COMMENT_.find({ review: body.review, user: body.comment.user });
            if (commentDB) {
                res.send({
                    message: "Ya comentaste esta reseña.",
                    code: "COME00-C"
                })
            } else {
                const commentDB = await _COMMENT_.findById(id);

                if (commentDB) {
                    const userDB = await _USER_.findById(body.comment.user);
                    if (userDB) {
                        if (body.comment.content <= 0 || body.comment.content >= 301) {
                            res.send({
                                message: "El comentario debe tener un máximo de 300 caracteres.",
                                code: "COME03-C"
                            })
                        } else {
                            const data = await _COMMENT_.findOneAndUpdate({ _id: id }, { $push: { comment: body.comment } }, { returnOriginal: false }).populate('comment.user');
                            res.send({
                                message: "Registro actualizado exitosamente.",
                                data //lo mismo a data: data
                            })
                        }
                    } else {
                        res.send({
                            message: "Error encontrado al usuario que escribió el comentario.",
                            code: "COME02-C"
                        })
                    }
                } else {
                    res.send({
                        message: "El comentario que se desea actualizar no existe.",
                        code: "COME02"
                    })
                }

            }
        } else {
            res.send({
                message: "No existe la reseña a la cual se está comentando.",
                code: "COME01"
            })
        }

    } catch (error) {
        res.send(error)
    }
}

exports.comment_delete = async (req, res) => {
    try {
        const { id, idUser } = req.params;
        const commentDB = await _COMMENT_.find({ _id: id, user: idUser });
        if (commentDB) {
            await _COMMENT_.updateOne({ _id: id }, { $pull: { user: idUser } }); //ver si elimina el comentario o solo el id del usuario
            //await _COMMENT_.deleteOne({ _id: id });

            res.send({ message: "Registro eliminado exitosamente" });
        } else {
            res.send({
                message: "No se ha encontrado el comentario.",
                code: "COME00"
            })
        }
    } catch (error) {
        res.send(error)
    }

}