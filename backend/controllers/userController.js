const _USER_ = require("../models/userSchema");

exports.user_getall = async (req, res) => {
    try {
        const data = await _USER_.find();
        res.send(data);
    } catch (error) {
        res.send(error);
    }

}

exports.user_getOne = async (req, res) => {
    try {
        const { id } = req.params;
        const data = await _USER_.findById(id);

        if (data) {
            res.send(data);
        } else {
            res.send({
                message: "No se encontró el usuario con el ID introducido",
                code: "UE00"
            })
        }


    } catch (error) {
        res.send(error);
    }

}

exports.user_create = async (req, res) => {
    try {
        const { body } = req;

        //validación de información.
        if (!validateEmail(body.email)) {
            res.send({
                message: "Ingresa un correo electrónico válido.",
                code: "UE00-R"
            })
        } else if (body.name.length <= 3 || body.name.length >= 31) {
            res.send({
                message: "El nombre debe ser entre 4 y 30 caracteres.",
                code: "UE01-R"
            })
        }
        else if (!validatePassword(body.password)) {
            res.send({
                message: "La contraseña debe cumplir con los requisitos",
                code: "UE02-R"
            })
        }
        else {
            let newUser = new _USER_(body);
            await newUser
                .save()
                .then((newObject) => console.log("Success!", newObject))
                .catch((err) => {
                    console.error("Oops!!", err)
                    res.send({ code: "UE01", message: "Ya se ha registrado un usuario con ese correo." });
                });

            res.send(newUser);
        }


    } catch (error) {

    }

};

exports.user_update = async (req, res) => {
    try {
        const { id } = req.params;
        const { body } = req;
        //validación de información.
        const userDB = await _USER_.findById(id);

        if (!validatePassword(body.password)) {
            res.send({
                message: "La contraseña debe cumplir con los requisitos",
                code: "UE02-M"
            })
        }
        else if (body.name.length <= 3 || body.name.length >= 31) {
            res.send({
                message: "El nombre debe ser entre 4 y 30 caracteres.",
                code: "UE01-M"
            })
        } else if (body.desc.length >= 201) {
            res.send({
                message: "La descripción solo puede tener máximo 200 caracteres.",
                code: "UE03-M"
            })
        }
        else if (userDB) {
            const data = await _USER_.findOneAndUpdate({ _id: id }, body, { returnOriginal: false });
            res.send({
                message: "Registro actualizado exitosamente.",
                data //lo mismo a data: data
            })
        }
        else {
            res.send({
                message: "No se encontró el usuario con el ID introducido",
                code: "UE00"
            })
        }
    } catch (error) {
        console.log(error)
        res.send(error)
    }

}

exports.user_delete = async (req, res) => {
    try {
        const { id } = req.params;

        const userDB = await _USER_.findById(id);
        if (userDB) {
            await _USER_.deleteOne({ _id: id });

            res.send({ message: "Registro eliminado exitosamente" });
        } else {
            res.send({
                message: "No se encontró el usuario con el ID introducido",
                code: "UE00"
            })
        }

    } catch (error) {
        res.send(error)
    }

}

exports.user_logIn = async (req, res) => {
    try {
        const { email, password } = req.params;
        const userDB = await _USER_.find({ email, password });
        if (userDB.length != 0) {
            res.send({
                message: "Usuario encontrado",
                data: userDB
            })
        } else {
            res.send({
                message: "El correo y/o contraseña están equivocadas.",
                code: "UE01"
            })
        }

    } catch (error) {

    }
}

const validateEmail = (email) => {
    return String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
};

const validatePassword = (pass) => {
    return String(pass)
        .match(
            /^(?=.{8,})(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9].*)(?=.*[@#$%^&+*!=]).*$/
        );
};