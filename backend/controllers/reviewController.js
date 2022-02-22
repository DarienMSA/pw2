const _REVIEW_ = require("../models/reviewSchema");
const _GAME_ = require("../models/gameSchema");
const _USER_ = require("../models/userSchema");

exports.review_getall = async (req, res) => {
    try {
        const data = await _REVIEW_.find();
        res.send(data);
    } catch (error) {
        res.send(error);
    }

}

exports.review_getOne = async (req, res) => {
    try {
        const { id } = req.params;
        const data = await _REVIEW_.findById(id);
        if (data) {
            res.send(data);
        } else {
            res.send({
                message: "No se ha encontrado la reseña.",
                code: "RE00"
            })
        }
    } catch (error) {
        res.send(error);
    }
}

exports.review_create = async (req, res) => {
    try {
        const { body } = req;
        const gameDB = await _GAME_.findById(body.gameId);
        if (gameDB) {
            const userDB = await _USER_.findById(body.userId);
            if (userDB) {
                if (body.name.length < 0 || body.name.length > 140) {
                    res.send({
                        message: "La reseña solo puede contar con un máximo de 140 caracteres",
                        code: "RE00-C"
                    })
                } else if (body.score < 0 || body.score > 5) {
                    res.send({
                        message: "El puntaje solo puede ser entre 0 y 5.",
                        code: "RE01-C"
                    })
                } else {
                    const reviewDB = _REVIEW_.find({ userId: body.userId, gameId: body.gameId });
                    if (reviewDB) {
                        res.send({
                            message: "El usuario ya escribió una reseña de este juego.",
                            code: "RE04-C"
                        })
                    } else {
                        let newReview = _REVIEW_(body);
                        await newReview
                            .save()
                            .then((newObject) => console.log("Success!", newObject))
                            .catch((err) => {
                                console.log("Oops!!", err);
                                res.send({ code: "RE03-C", message: err });
                            })
                        res.send(newReview);
                    }

                }
            } else {
                res.send({
                    message: "Error encontrando al usuario que crea la reseña.",
                    code: "RE01"
                })
            }
        } else {
            res.send({
                message: "Error encontrando el juego a reseñar.",
                code: "RE02"
            })
        }
    } catch (error) {
        res.send(error);
    }
}

exports.review_update = async (req, res) => {
    try {
        const { id } = req.params;
        const { body } = req;

        const gameDB = await _GAME_.findById(body.gameId);
        if (gameDB) {
            const userDB = await _USER_.findById(body.userId);
            if (userDB) {
                if (body.name.length < 0 || body.name.length > 140) {
                    res.send({
                        message: "La reseña solo puede contar con un máximo de 140 caracteres",
                        code: "RE00-C"
                    })
                } else if (body.score < 0 || body.score > 5) {
                    res.send({
                        message: "El puntaje solo puede ser entre 0 y 5.",
                        code: "RE01-C"
                    })
                } else {
                    const data = await _REVIEW_.findOneAndUpdate({ _id: id }, body, { returnOriginal: false });
                    res.send({
                        message: "Registro actualizado exitosamente.",
                        data //lo mismo a data: data
                    })
                }
            } else {
                res.send({
                    message: "Error encontrando al usuario que crea la reseña.",
                    code: "RE01"
                })
            }
        } else {
            res.send({
                message: "Error encontrando el juego a reseñar.",
                code: "RE02"
            })
        }
    } catch (error) {
        res.send(error)
    }
}

exports.review_upvote = async (req, res) => {
    try {
        const { id, idUser } = req.params;
        const userDB = await _USER_.findById(idUser);
        if (userDB) {
            const reviewDB = await _REVIEW_.findById(id);
            if (reviewDB) {
                reviewDB.vote++;
                const data = await _COMMENT_.findOneAndUpdate({ _id: id }, { vote: reviewDB.vote }, { $push: { voteUsers: idUser } }, { returnOriginal: false });
                res.send({
                    message: "Se ha valorado la reseña.",
                    data //lo mismo a data: data
                })
            } else {
                res.send({
                    message: "No se ha encontrado la reseña.",
                    code: "RE00"
                })
            }
        } else {
            res.send({
                message: "Error encontrando al usuario que valora la reseña.",
                code: "RE02"
            })
        }
    } catch (error) {
        res.send(error);
    }
}

exports.review_downvote = async (req, res) => {
    try {
        const { id, idUser } = req.params;
        const userDB = await _USER_.findById(idUser);
        if (userDB) {
            const reviewDB = await _REVIEW_.findById(id);
            if (reviewDB) {
                reviewDB.vote--;
                const data = await _COMMENT_.findOneAndUpdate({ _id: id }, { vote: reviewDB.vote }, { $pull: { voteUsers: idUser } }, { returnOriginal: false });
                res.send({
                    message: "Se ha valorado la reseña.",
                    data //lo mismo a data: data
                })
            } else {
                res.send({
                    message: "No se ha encontrado la reseña.",
                    code: "RE00"
                })
            }
        } else {
            res.send({
                message: "Error encontrando al usuario que valora la reseña.",
                code: "RE02"
            })
        }
    } catch (error) {
        res.send(error);
    }
}

exports.review_delete = async (req, res) => {
    try {
        const { id } = req.params;
        const reviewDB = await _REVIEW_.findById(id);
        if (reviewDB) {
            await _REVIEW_.deleteOne({ _id: id });

            res.send({ message: "Registro eliminado exitosamente" });
        } else {
            res.send({
                message: "No se ha encontrado la reseña.",
                code: "RE00"
            })
        }
    } catch (error) {
        res.send(error)
    }

}