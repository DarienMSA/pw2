const _CHAT_LOG_ = require("../models/chatLogSchema");

exports.chatLog_getall = async (req, res) => {
    try {
        const data = await _CHAT_LOG_.find();
        res.send(data);
    } catch (error) {
        res.send(error);
    }

}

exports.chatLog_getOne = async (req, res) => {
    try {
        const { id } = req.params;
        const data = await _CHAT_LOG_.findById(id);
        if (data) {
            res.send(data);
        } else {
            res.send({
                message: "No se ha encontrado el chat.",
                code: "CLE00"
            })
        }
    } catch (error) {
        res.send(error);
    }
}


exports.chatLog_create = async (req, res) => {
    try {
        const { body } = req;
        const chatLogDB = await _CHAT_LOG_.find({ chat: body.chat });
        if (chatLogDB.length != 0) {
            res.send({
                message: "Tratando de crear un chat log existente",
                code: "CLE03-C"
            })
        }
        else if (body.message.content.length < 1) {
            res.send({
                message: "El mensaje no puede estar vacío",
                code: "CLE00-C"
            })
        } else if (body.message.from == "" || body.message.to == "") {
            res.send({
                message: "Error al detectar usuario origen del mensaje.",
                code: "CLE01-C"
            })
        } else {
            let newChatLog = _CHAT_LOG_(body);
            await newChatLog
                .save()
                .then((newObject) => console.log("Success!", newObject))
                .catch((err) => {
                    console.log("Oops!!", err);
                    res.send({ code: "CLE02-C", message: err });
                })
            res.send(newChatLog);
        }
    } catch (error) {
        res.send(error);
    }
}

exports.chatLog_update = async (req, res) => {
    try {
        const { id } = req.params;
        const { body } = req;
        const chatLogDB = await _CHAT_LOG_.findById(id);

        if (body.message.content.length < 1) {
            res.send({
                message: "El mensaje no puede estar vacío",
                code: "CLE00-C"
            })
        } else if (body.message.from == "" || body.message.to == "") {
            res.send({
                message: "Error al detectar usuario origen del mensaje.",
                code: "CLE01-C"
            })

        } else if (chatLogDB) {

            const data = await _CHAT_LOG_.findOneAndUpdate({ _id: id }, { $push: { message: body.message } }, { returnOriginal: false }).populate('message.from message.to');

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

exports.chatLog_delete = async (req, res) => {
    try {
        const { id } = req.params;
        const chatLogDB = await _CHAT_LOG_.findById(id);
        if (chatLogDB) {
            await _CHAT_LOG_.deleteOne({ _id: id });

            res.send({ message: "Registro eliminado exitosamente" });
        } else {
            res.send({
                message: "No se ha encontrado el chat.",
                code: "CLE00"
            })
        }
    } catch (error) {
        res.send(error)
    }

}