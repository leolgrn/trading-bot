const router = require("express").Router();

module.exports = server => {

    router.get('/day',server.controllers.histoData.day)

    server.use('/histo-data', router);

}
