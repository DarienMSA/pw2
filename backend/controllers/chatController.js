const _CHAT_ = require("../models/chatSchema");
const _USER_ = require("../models/userSchema");

exports.chat_getall = async (req, res) => {
    try {
        const data = await _CHAT_.find();
        res.send(data);
    } catch (error) {
        res.send(error);
    }

}

exports.chat_getOne = async (req, res) => {
    try {
        const { id } = req.params;
        const data = await _CHAT_.findById(id);
        if (data) {
            res.send(data);
        } else {
            res.send({
                message: "No se ha encontrado el chat.",
                code: "CE00"
            })
        }
    } catch (error) {
        res.send(error);
    }
}

exports.chat_create = async (req, res) => {
    try {
        const { body } = req;
        if (body.members.length != 2) {
            res.send({
                message: "En las salas de chat solo pueden haber 2 personas.",
                code: "CE00-C"
            })
        } else {
            const userOne = await _USER_.findById(body.members[0]);
            const userTwo = await _USER_.findById(body.members[1]);
            if (!userOne || !userTwo) {
                res.send({
                    message: "Un usuario no existe.",
                    code: "CE01-C"
                })
            } else {
                const chatDB = await _CHAT_.find({ members: body.members })

                if (chatDB.length != 0) {
                    res.send({
                        message: "Ya existe un chat con esos usuarios",
                        code: "CE02-C"
                    })
                } else {
                    let newChat = _CHAT_(body);
                    await newChat
                        .save()
                        .then((newObject) => console.log("Success!", newObject))
                        .catch((err) => {
                            console.log("Oops!!", err);
                            res.send({ code: "CE03-C", message: err });
                        })
                    res.send(newChat);
                }
            }


        }
    } catch (error) {
        res.send(error);
    }
}

exports.chat_update = async (req, res) => {
    try {
        const { id } = req.params;
        const { body } = req;
        const chatDB = await _CHAT_.findById(id);

        if (body.members.length != 2) {
            res.send({
                message: "En las salas de chat solo pueden haber 2 personas.",
                code: "CE00-C"
            })
        } else if (chatDB) {
            const data = await _CHAT_.findOneAndUpdate({ _id: id }, body, { returnOriginal: false });
            res.send({
                message: "Registro actualizado exitosamente.",
                data //lo mismo a data: data
            })
        }
        else {
            res.send({
                message: "No se ha encontrado el chat.",
                code: "CE00"
            })
        }
    } catch (error) {
        res.send(error)
    }
}

exports.chat_delete = async (req, res) => {
    try {
        const { id } = req.params;
        const chatDB = await _CHAT_.findById(id);
        if (chatDB) {
            await _CHAT_.deleteOne({ _id: id });

            res.send({ message: "Registro eliminado exitosamente" });
        } else {
            res.send({
                message: "No se ha encontrado el chat.",
                code: "CE00"
            })
        }
    } catch (error) {
        res.send(error)
    }

}