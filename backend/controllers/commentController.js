const _COMMENT_ = require("../models/commentSchema");
const _REVIEW_ = require("../models/reviewSchema");
const _USER_ = require("../models/userSchema");

exports.comment_getall = async (req, res) => {
    try {
        const data = await _COMMENT_.find();
        res.send(data);
    } catch (error) {
        res.send(error);
        console.error(error);
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
            console.error(`message: "No se ha encontrado el comentario.",
            code: "COME00"`)
        }
    } catch (error) {
        res.send(error);
        console.error(error)
    }
}

exports.comment_getReviewComments = async (req, res) => {
    try {
        const { id } = req.params;
        const data = await _COMMENT_.find({ review: id }).sort({ _id: -1 }).populate('comment.user');
        res.send(data);
    } catch (error) {
        res.send(error);
        console.error(error)
    }
}

exports.comment_create = async (req, res) => {
    try {
        const { body } = req;

        const reviewDB = await _REVIEW_.findById(body.review);
        if (reviewDB) {

            const userDB = await _USER_.findById(body.comment.user);
            if (userDB) {
                if (body.comment.content == 0) {
                    res.send({
                        message: "El comentario debe contener algo.",
                        code: "COME03-C"
                    })
                    console.error(`message: "El comentario debe contener algo.",
                        code: "COME03-C"`)
                } else {
                    let newComment = _COMMENT_(body);
                    await newComment
                        .save()
                        .then((newObject) => console.log("Success!", newObject))
                        .catch((err) => {
                            console.error(err);
                            res.send({ code: "COME04-C", message: err });
                        })
                    res.send(newComment);
                }
            } else {
                res.send({
                    message: "Error encontrado al usuario que escribió el comentario.",
                    code: "COME02-C"
                })
                console.error(`message: "Error encontrado al usuario que escribió el comentario.",
                    code: "COME02-C"`)
            }

        } else {
            res.send({
                message: "No existe la reseña a la cual se está comentando.",
                code: "COME01"
            })
            console.error(`message: "No existe la reseña a la cual se está comentando.",
            code: "COME01"`)
        }
    } catch (error) {
        res.send(error);
        console.error(error);
    }
}

exports.comment_add = async (req, res) => {
    try {
        const { id } = req.params;
        const { body } = req;
        const reviewDB = await _REVIEW_.findById(body.review);
        if (reviewDB) {
            //const commentDB = await _COMMENT_.findById(id);
            const commentDB = await _COMMENT_.findById(id)

            if (commentDB) {
                const userDB = await _USER_.findById(body.comment.user);
                if (userDB) {
                    if (body.comment.content <= 0 || body.comment.content >= 301) {
                        res.send({
                            message: "El comentario debe tener un máximo de 300 caracteres.",
                            code: "COME03-C"
                        })
                        console.error(`message: "El comentario debe tener un máximo de 300 caracteres.",
                        code: "COME03-C"`)
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
                    console.error(`message: "Error encontrado al usuario que escribió el comentario.",
                    code: "COME02-C"`)
                }
            } else {
                res.send({
                    message: "El comentario que se desea actualizar no existe.",
                    code: "COME02"
                })
                console.error(`message: "El comentario que se desea actualizar no existe.",
                code: "COME02"`)
            }


        } else {
            res.send({
                message: "No existe la reseña a la cual se está comentando.",
                code: "COME01"
            })
            console.error(`message: "No existe la reseña a la cual se está comentando.",
            code: "COME01"`)
        }

    } catch (error) {
        res.send(error)
        console.error(error);
    }
}

exports.comment_update = async (req, res) => {
    try {
        const { id } = req.params;
        const { body } = req;
        const reviewDB = await _REVIEW_.findById(body.review);
        if (reviewDB) {
            const commentDB = await _COMMENT_.findById(id);

            if (commentDB) {
                const userDB = await _USER_.findById(body.comment.user);
                if (userDB) {
                    if (body.comment.content == 0) {
                        res.send({
                            message: "El comentario debe contener algo.",
                            code: "COME03-C"
                        })
                        console.error(`message: "El comentario debe contener algo.",
                            code: "COME03-C"`)
                    } else {
                        const data = await _COMMENT_.findOneAndUpdate(
                            { '_id': id },
                            body,
                            { returnOriginal: false })
                            .populate('comment.user');
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
                    console.error(`message: "Error encontrado al usuario que escribió el comentario.",
                        code: "COME02-C"`)
                }
            } else {
                res.send({
                    message: "El comentario que se desea actualizar no existe.",
                    code: "COME02"
                })
                console.error(`message: "El comentario que se desea actualizar no existe.",
                    code: "COME02"`);
            }


        } else {
            res.send({
                message: "No existe la reseña a la cual se está comentando.",
                code: "COME01"
            })
            consoler.error(`message: "No existe la reseña a la cual se está comentando.",
            code: "COME01"`);
        }

    } catch (error) {
        res.send(error)
        console.error(error);
    }
}

exports.comment_remove = async (req, res) => {
    try {
        const { id, idComment } = req.params;
        const commentDB = await _COMMENT_.findById(id)
        if (commentDB) {
            await _COMMENT_.updateOne({ _id: id }, { $pull: { comment: { _id: idComment } } });
            //await _COMMENT_.deleteOne({ _id: id });

            res.send({ message: "Registro eliminado exitosamente" });
        } else {
            res.send({
                message: "No se ha encontrado el comentario.",
                code: "COME00"
            })
            console.error(`message: "No se ha encontrado el comentario.",
            code: "COME00"`);
        }
    } catch (error) {
        res.send(error);
        console.error(error);
    }

}

exports.comment_delete = async (req, res) => {
    try {
        const { id } = req.params;
        const commentDB = await _COMMENT_.findById(id)
        if (commentDB) {
            await _COMMENT_.deleteOne({ _id: id });

            res.send({ message: "Registro eliminado exitosamente" });
        } else {
            res.send({
                message: "No se ha encontrado el comentario.",
                code: "COME00"
            })
            console.error(`message: "No se ha encontrado el comentario.",
            code: "COME00"`);
        }
    } catch (error) {
        res.send(error)
        console.error(error);
    }

}