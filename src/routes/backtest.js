const router = require("express").Router();

module.exports = server => {

    router.post('/moving-average',server.controllers.backtest.movingAverage)

    server.use('/backtest', router);
}
