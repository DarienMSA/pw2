const _CHAT_LOG_ = require("../models/chatLogSchema");
const _CHAT_ = require("../models/chatSchema");

exports.chatLog_getall = async (req, res) => {
    try {
        const data = await _CHAT_LOG_.find();
        res.send(data);
    } catch (error) {
        res.send(error);
        console.error(error);
    }

}

exports.chatLog_getOne = async (req, res) => {
    try {
        const { id } = req.params;
        const data = await _CHAT_LOG_.findById(id);
        console.log(data)
        if (data) {
            res.send(data);
        } else {
            res.send({
                message: "No se ha encontrado el chat.",
                code: "CLE00"
            })
            console.error(`message: "No se ha encontrado el chat.",
            code: "CLE00"`);
        }
    } catch (error) {
        res.send(error);
        console.error(error);
    }
}

exports.chatLog_getOneChat = async (req, res) => {
    try {
        const { id } = req.params;
        const data = await _CHAT_LOG_.findOne({ chat: id }).sort({ "message": -1 }).populate('message.from message.to');
        if (data) {
            res.send(data);
        } else {
            res.send({
                message: "No se ha encontrado el chat.",
                code: "CLE00"
            })
            console.error(`message: "No se ha encontrado el chat.",
            code: "CLE00"`);
        }
    } catch (error) {
        res.send(error);
        console.error(error);
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
            console.error(`message: "Tratando de crear un chat log existente",
            code: "CLE03-C"`)
        }
        else if (body.message.content.length < 1) {
            res.send({
                message: "El mensaje no puede estar vacío",
                code: "CLE00-C"
            })
            console.error(`message: "El mensaje no puede estar vacío",
            code: "CLE00-C"`);
        } else if (body.message.from == "" || body.message.to == "") {
            res.send({
                message: "Error al detectar usuario origen del mensaje.",
                code: "CLE01-C"
            })
            console.error(`message: "Error al detectar usuario origen del mensaje.",
            code: "CLE01-C"`);
        } else {
            let newChatLog = _CHAT_LOG_(body);
            await _CHAT_.findOneAndUpdate({ _id: body.chat }, { seen: false, lastMessageDate: body.message.messageDate, lastMessage: body.message.content, lastMessageFrom: body.message.from }, { returnOriginal: false });
            await newChatLog
                .save()
                .then((newObject) => console.log("Success!", newObject))
                .catch((err) => {
                    console.error(err);
                    res.send({ code: "CLE02-C", message: err });
                })
            res.send(newChatLog);
        }
    } catch (error) {
        res.send(error);
        console.error(error)
    }
}

exports.chatLog_addMessage = async (req, res) => {
    try {
        const { id } = req.params;
        const { body } = req;
        const chatLogDB = await _CHAT_LOG_.findOne({ chat: id });

        if (body.message.content.length < 1) {
            res.send({
                message: "El mensaje no puede estar vacío",
                code: "CLE00-C"
            })
            console.error(`message: "El mensaje no puede estar vacío",
            code: "CLE00-C"`);
        } else if (body.message.from == "" || body.message.to == "") {
            res.send({
                message: "Error al detectar usuario origen del mensaje.",
                code: "CLE01-C"
            })
            console.error(`message: "Error al detectar usuario origen del mensaje.",
            code: "CLE01-C"`);
        } else if (chatLogDB) {

            const data = await _CHAT_LOG_.findOneAndUpdate({ chat: id }, { $push: { message: body.message } }, { returnOriginal: false }).populate('message.from message.to');
            await _CHAT_.findOneAndUpdate({ _id: id }, { seen: false, lastMessageDate: body.message.messageDate, lastMessage: body.message.content }, { returnOriginal: false });

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
            console.error(`message: "No se ha encontrado el chat.",
            code: "CE00"`)
        }
    } catch (error) {
        res.send(error)
        console.error(error)
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
            console.error(`message: "No se ha encontrado el chat.",
            code: "CE00"`)
        }
    } catch (error) {
        res.send(error)
        console.error(error)
    }

}

const getCurrentDate = () => {
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0');
    let yyyy = today.getFullYear();

    today = yyyy + '-' + mm + '-' + dd;
    return today
}