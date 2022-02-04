const router = require("express").Router();

module.exports = server => {

    router.post('/moving-average',server.controllers.calcul.movingAverage)

    server.use('/calcul', router);
}
