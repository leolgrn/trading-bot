module.exports = server => {
    server.controllers = {
        histoData: require("./histo-data")(server),
        calcul: require("./calcul")(server),
        backtest: require("./backtest")(server)
    }
}
