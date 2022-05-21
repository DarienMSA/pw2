const _MONGOOSE_ = require('mongoose');

_MONGOOSE_.Promise = global.Promise;

_MONGOOSE_.connect('mongodb+srv://arsaga:iFmfxVTeYZRuoT3d@gameview.ttg1y.mongodb.net/gameview?retryWrites=true&w=majority',
    { useNewUrlParser: true })
    .then(() => console.log("Conectado a la base de datos MongoDB"))
    .catch(() => {
        console.error("No se pudo conectar con la base de datos MongoDB")
        process.exit();
    });