module.exports = server => {
    server.controllers = {
        histoData: require("./histo-data")(server),
        backtest: require("./backtest")(server),
        scheduled: require("./scheduled")(server)
    }
}
