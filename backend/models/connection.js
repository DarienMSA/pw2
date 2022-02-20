const _MONGOOSE_ = require('mongoose');

_MONGOOSE_.Promise = global.Promise;

_MONGOOSE_.connect('mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false',
    { useNewUrlParser: true })
    .then(() => console.log("Conectado a la base de datos MongoDB"))
    .catch(() => {
        console.error("No se pudo conectar con la base de datos MongoDB")
        process.exit();
    });