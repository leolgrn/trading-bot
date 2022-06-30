module.exports = server => {
  server.services = {
    cryptoCompare: require("./crypto-compare")(server),
    binance: require("./binance")(server),
    talib: require("./talib")(server),
    backtest: require("./backtest")(server)
  }
}
