const _USER_ = require("../models/userSchema");

exports.user_getall = async (req, res) => {
    const data = await _USER_.find();

    //console.log(data[1].social.twitter);

    res.send(data);
}

exports.user_create = async (req, res) => {
    const { body } = req;

    //validación de información.

    let newUser = new _USER_(body);
    await newUser
        .save()
        .then((newObject) => console.log("Success!", newObject))
        .catch((err) => {
            console.error("Oops!!", err)
            res.send({ code: "", message: "" });
        });

    res.send(newUser);
};