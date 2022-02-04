const router = require("express").Router();

module.exports = server => {

    router.get('/day',server.controllers.histoData.day)
    router.get('/hour',server.controllers.histoData.hour)
    router.get('/minute',server.controllers.histoData.minute)

    server.use('/histo-data', router);

}
